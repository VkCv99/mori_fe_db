import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, User } from "lucide-react";
import { motion } from 'framer-motion';
import useAxios from "hooks/useAxios";
import { toast } from 'react-toastify';
import { HelpCircle } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "common/Tooltip";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Loader from 'common/Loader';
import AITechEnablementPPT from "../assets/ppts/ai_tech_enablement.pptx";
import { useApp } from 'context/AppContext';

const AITechEnablement = () => {
  const navigate = useNavigate()
  const { postCall, getCall } = useAxios();
  const { setFinalResultValues, getPreviousPath } = useApp()
  const [currentArea, setCurrentArea] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputAnswers, setInputAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [techEnablementAreas, setTechEnablementAreas] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const extractSelectedValues = (data) => {
    return data.reduce((acc, item) => {
      const selectedOption = item.options.find(opt => opt.selected);
      const propertyMap = {
        'Linked AI Value': 'linkedAIvalue',
        'AI Responsiible Use': 'aiResponsibleUse',
        'Quadrant Mapping': 'quadrantMapping'
      };
      
      const propertyName = propertyMap[item.title];
      if (propertyName && selectedOption) {
        acc[propertyName] = selectedOption.value;
      }
      
      return acc;
    }, {});
  };

  const handleAnswer = (selectedOption) => {
    const section = techEnablementAreas[currentArea];
    const question = section.questions[currentQuestion];
    const { linkedAIvalue, aiResponsibleUse, quadrantMapping } = extractSelectedValues(section.defaultInfo)
    setAnswers(prev => ({
      ...prev,
      [currentArea]: {
        ...(prev[currentArea] || {}),
        [question.id]: selectedOption
      }
    }));

    setInputAnswers(prevState => {
      const newState = { ...prevState };
      const [newAppName, categoryName] = section.title.split('-').map(item => item.trim());
      // If this section doesn't exist, create it
      if (!newState[currentArea+1]) {
        newState[currentArea+1] = {
          new_app_name: newAppName,
          category_name: categoryName,
          description: section.description,
          value_area_name: aiResponsibleUse,
          ai_use_class: linkedAIvalue,
          ai_enablement_quadrant: quadrantMapping,
          quadrant_reasoning: section.quadrant_reasoning, // Add reasoning if available
          questions: {}
        };
      }
      
      // Add or update the question for this section
      if (question) {
        // Check if question already exists
        const existingQuestionIndex = Object.values(newState[currentArea+1].questions)
          .findIndex(q => q.question === question.label);

        if (existingQuestionIndex === -1) {
          // Question doesn't exist, add it with next available number
          const questionCount = Object.keys(newState[currentArea+1].questions).length + 1;
          newState[currentArea+1].questions[questionCount] = {
            question: question.label,
            answer: selectedOption?.label || ''
          };
        } else {
          // Question exists, update the answer if needed
          const existingQuestionNumber = Object.keys(newState[currentArea+1].questions)[existingQuestionIndex];
          newState[currentArea+1].questions[existingQuestionNumber] = {
            question: question.label,
            answer: selectedOption?.label || ''
          };
        }
      }
      
      return newState;
    });
    setMessages((preMessages) => {
      if(preMessages[preMessages.length-1].type === "user"){
        preMessages[preMessages.length-1].options.forEach((option)=>{
          if(option.value === selectedOption.value){
            option.selected = true
            preMessages[preMessages.length-1].isAnswered = true
          }
        })
      }

      const updatedMessages = [
        ...preMessages,
        { type: 'user', content: selectedOption.label }
      ];
      if (currentQuestion < section.questions.length - 1) {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        if(section.questions[nextQuestion].explanation){
          updatedMessages.push(
            { type: 'bot', content: section.questions[nextQuestion].label },
            { type: 'bot', content:section.questions[nextQuestion].explanation },
            { type: 'user', content: 'options', options: section.questions[nextQuestion].options, "isAnswered":false }
          );
        } else{
          updatedMessages.push(
            { type: 'bot', content: section.questions[nextQuestion].label },
            { type: 'user', content: 'options', options: section.questions[nextQuestion].options, "isAnswered":false }
          );
        }
        
      } else if (currentArea < techEnablementAreas.length - 1) {
        updatedMessages.push({ type: 'bot', content: 'Great! Let\'s move on to the next section.' });
      } else {
        updatedMessages.push({ type: 'bot', content: 'Thank you for completing the assessment!' });
      }
      return updatedMessages;
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const userId = localStorage.getItem("userid");
    const result = await postCall("save-tech-reasoning", inputAnswers, { "user-id": userId });
      if(result.success){
        setFinalResultValues(result.data)
        navigate('/final-result')
      } else {
        toast.warn(`${result.error}`)
      }
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isCurrentAssessmentComplete = () => {
    const currentAnswers = answers[currentArea] || {};
    return techEnablementAreas[currentArea]?.questions.every(q => currentAnswers[q.id]) ?? false;
  };

  const canProceed =  currentArea < (techEnablementAreas.length - 1) && isCurrentAssessmentComplete();
  const canSubmit = currentArea === (techEnablementAreas.length - 1) && isCurrentAssessmentComplete();


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth",block: "end", inline: "nearest" });
  };

  useEffect(()=>{
    const userId = localStorage.getItem("userid");
    if(userId === null || userId === undefined || userId === "" ){
      navigate("/")
    }
    getCall("fetch-tech-reasoning", {'user-id': userId}).then((result)=>{
      if(result.success){
        if(!result.data.length){
          getPreviousPath()
        }
        setTechEnablementAreas(result.data)
      }
    })
    // eslint-disable-next-line
  },[])

  const initializeSection = useCallback(() => {
    if(techEnablementAreas.length){
      const section = techEnablementAreas[currentArea];
      if(section?.questions[0]?.explanation){
        setMessages([
          { type: 'bot', content: `Let's discuss ${section.title}.` },
          { type: 'bot', content: section.questions[0].label },
          { type: 'bot', content: section.questions[0].explanation },
          { type: 'user', content: 'options', options: section.questions[0].options, "isAnswered":false }
        ]);
      } else {
        setMessages([
          { type: 'bot', content: `Let's discuss ${section.title}.` },
          { type: 'bot', content: section.questions[0].label },
          { type: 'user', content: 'options', options: section.questions[0].options, "isAnswered":false }
        ]);
      } 
      setCurrentQuestion(0);
    }
  },[techEnablementAreas, currentArea])

  useEffect(() => {
    if(techEnablementAreas.length){
      initializeSection();
    }
  }, [currentArea, techEnablementAreas, initializeSection]);

  useEffect(()=>{
    if(messages.length){
      scrollToBottom()
    }
  },[messages]);

  if (techEnablementAreas.length === 0) {
    return <Loader/>;
  }
  return (
    <>
      <Breadcrumb pageName="AI Tech Enablement" ppt={AITechEnablementPPT}/>
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
      >
          <div className="bg-white shadow-xl rounded-lg overflow-hidden my-6">
            <div className="bg-primary text-white p-4">
              <h2 className="text-xl font-bold">{techEnablementAreas[currentArea]?.title}</h2>
              <p className="text-sm text-light-gray">
                {/* Step {currentArea + 1} of {techEnablementAreas.length} */}
                {techEnablementAreas[currentArea].description}
              </p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {techEnablementAreas[currentArea]?.defaultInfo.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-light-gray p-2 rounded-md shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="mr-1 text-lg">{item.icon}</span>
                        <h4 className="font-semibold text-sm text-primary">{item.title}</h4>
                      </div>
                      
                      {item.title === "Quadrant Mapping" ? 
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-full transition-colors">
                              <HelpCircle className="h-4 w-4 text-primary" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent 
                            className="bg-white text-black z-50"
                            side="left"
                            sideOffset={5}
                          >
                            <p className="mb-2 text-xs">
                             {techEnablementAreas[currentArea].quadrant_reasoning}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                       : null}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.options.map((option, optIndex) => (
                        <span key={`opt_${index}_${optIndex}`} className={`px-1 py-0.5 rounded text-xs ${ option.selected ? 'bg-primary text-light-gray' : 'text-primary bg-white'} `}>
                          {option.value}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <h3 className="font-semibold text-md text-primary mb-3">Reasoning statements</h3>
              
              <div ref={messagesEndRef} className="flex-grow overflow-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <>
                  
                  <div key={index} className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
                  {message.type === 'bot' ? <Bot size={24} className="text-primary mr-3" /> : null}
                    <div className={`max-w-xs md:max-w-md min-w-125 p-3 rounded-lg ${message.type === 'bot' ? 'bg-primary text-white' : 'bg-light-gray text-dusky-teal'}`}>
                      {message.content === 'options' ? (
                        <div className="space-y-2">
                          {message.options.map((option, optIndex) => {
                              return (
                              <label key={`${option.value}_${optIndex}_${index}`} className={`px-4 flex items-center space-x-2 rounded-full transition-all duration-300 ease-in-out "
                                ${
                                  message.isAnswered
                                    ? option.selected
                                      ? "bg-primary text-white"
                                      : "bg-light-gray text-dusky-teal"
                                    : "hover:bg-primary hover:text-white"
                                }
                              `}>
                              <input
                                type="checkbox"
                                name={`question-${currentQuestion}-${optIndex}`}
                                checked={option.selected}
                                value={option.value}
                                onChange={()=> handleAnswer(option)}
                                className="form-radio"
                                disabled={message.isAnswered}
                              />
                              <span>{option.label}</span>
                            </label>)
                          })}
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                    {message.type === 'user' ? < User size={24} className="text-warm-red ml-3" /> : null}
                  </div>
                 
                  </>
                ))}
              </div>
            </div>
            <div className="bg-light-gray px-4 py-3 flex justify-between">
              <button 
                onClick={() => setCurrentArea(prev => prev - 1)}
                disabled={currentArea === 0}
                className="bg-white text-primary hover:bg-warm-red hover:text-white px-3 py-1 rounded text-sm disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-primary"
              >
                ← Previous
              </button>
              {canSubmit ? (
                <button 
                  onClick={handleSubmit} 
                  className="bg-primary text-white hover:bg-warm-red px-3 py-1 rounded text-sm disabled:opacity-50"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? 'Submitting...' : isSubmitted ? 'Submitted' : 'Submit'}
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentArea(prev => prev + 1)}
                  disabled={!canProceed}
                  className="bg-primary text-white hover:bg-warm-red px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
      </motion.div>
    </>
    
  );
};

export default AITechEnablement;