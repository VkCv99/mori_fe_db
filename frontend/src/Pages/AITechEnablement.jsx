import React, { useEffect, useState, useRef } from 'react';
import { Bot, User } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import useAxios from "hooks/useAxios";
import { toast } from 'react-toastify';
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Result from "components/Result/Result";
import { useApp } from "context/AppContext";
import AITechEnablementPPT from "../assets/ppts/ai_tech_enablement.pptx";

const AITechEnablement = () => {
  const { postCall } = useAxios();
  const { techEnableValues, userDetails } = useApp();
  const [currentArea, setCurrentArea] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [techEnablementAreas, setTechEnablementAreas] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [FinalresultValues, setFinalResultValues] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleAnswer = (selectedOption) => {
    const section = techEnablementAreas[currentArea];
    const question = section.questions[currentQuestion];
    setAnswers(prev => ({
      ...prev,
      [currentArea]: {
        ...(prev[currentArea] || {}),
        [question.id]: selectedOption
      }
    }));

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
        updatedMessages.push(
          { type: 'bot', content: section.questions[nextQuestion].label },
          { type: 'user', content: 'options', options: section.questions[nextQuestion].options, "isAnswered":false }
        );
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
    setShowResult(true);
    const result = await postCall("save-tech-reasoning", answers);
      if(result.success){
        setFinalResultValues(result.data)
        setShowResult(true)
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
    if(messages.length){
      scrollToBottom()
    }
  },[messages]);

  useEffect(()=>{
    setTechEnablementAreas(techEnableValues);
  },[techEnableValues])

  useEffect(() => {
    if(techEnablementAreas.length){
      initializeSection();
    }
  }, [currentArea, techEnablementAreas]);

  const initializeSection = () => {
    const section = techEnablementAreas[currentArea];
      setMessages([
        { type: 'bot', content: `Let's discuss ${section.title}.` },
        { type: 'bot', content: section.questions[0].label },
        { type: 'user', content: 'options', options: section.questions[0].options, "isAnswered":false }
      ]);
      setCurrentQuestion(0);
  };

  if (techEnablementAreas.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Breadcrumb pageName="AI Tech Enablement" ppt={AITechEnablementPPT}/>
      {!showResult ? (
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
                Step {currentArea + 1} of {techEnablementAreas.length}
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
                    <div className="flex items-center mb-1">
                      <span className="mr-1 text-lg">{item.icon}</span>
                      <h4 className="font-semibold text-sm text-primary">{item.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.options.map((option, optIndex) => (
                        <span key={optIndex} className={`px-1 py-0.5 rounded text-xs ${ option.selected ? 'bg-primary text-light-gray' : 'text-primary bg-white'} `}>
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
                              <label key={option.value} className={`px-4 flex items-center space-x-2 rounded-full transition-all duration-300 ease-in-out "
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
      ): <Result step={3} resultValues={FinalresultValues}/>
      }
    </>
    
  );
};

export default AITechEnablement;