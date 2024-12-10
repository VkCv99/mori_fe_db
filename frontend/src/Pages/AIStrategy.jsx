import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useApp } from "context/AppContext"
import { toast } from 'react-toastify';
import { ArrowRight } from 'lucide-react';
import Loader from 'common/Loader';
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import useAxios from "hooks/useAxios"
import AIStrategyPPT from "../assets/ppts/ai_startegy.pptx";
import AIStrategyCard from 'components/Result/AIStrategyCard';

function AIStrategy() {
  const navigate = useNavigate();
  const { getCall, postCall } = useAxios();
  const { getPreviousPath } = useApp();
  const [aiStrategies, setAiStrategies] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardSelect = (card) => {
    setSelectedCards(prevState => {
      // Check if the object with the same ID already exists
      const exists = prevState.some(item => item.id === card.id);
  
      if (exists) {
        // If the object exists, filter it out (pop it)
        return prevState.filter(item => item.id !== card.id);
      } else {
        // If the object does not exist, add it (push it)
        return [...prevState, card];
      }
    });
  };
  
  const checkIsSelected = (id) => {
    const exists = selectedCards.some(item => item.id === id);
    return exists;
  };
  
  const handleSubmit = async() => {
    const userId = localStorage.getItem("userid");
    const startegy = selectedCards.length ? selectedCards : aiStrategies;
    const result = await postCall("save-ai-strategy", startegy, {'user-id': userId});
      if(result.success){
        navigate("/ai-use")
      } else {
        toast.warn(`${result.error}`)
      }
  }
  
  useEffect(()=>{
    const userId = localStorage.getItem("userid");
    if(userId === null || userId === undefined || userId === "" ){
      navigate("/")
    }
    getCall("fetch-ai-strategy", {'user-id': userId}).then((result)=>{
      if(result.success){
        if(!result.data.length){
          getPreviousPath()
        }
        setAiStrategies(result.data)
      }
    })
    // eslint-disable-next-line
  },[])

  if(aiStrategies.length){
    return (
      <>
          <Breadcrumb pageName="AI Application" ppt={AIStrategyPPT}/>
          <div className="h-full overflow-y-auto w-full p-6 bg-gray-800 bg-opacity-30 rounded-lg backdrop-blur-sm overflow-hidden">
            {aiStrategies.map((aiStrategy, index) => (
               <AIStrategyCard 
                key={`ai_startegy_${index}`}
                index={index}
                app={aiStrategy}
                isSelected={checkIsSelected(aiStrategy.id)}
                onSelect={handleCardSelect}
              />
            ))}
            <button 
                className={`w-full space-x-2 p-2 rounded-lg border transition duration-200 flex items-center justify-center mb-4
                    bg-white text-dusky-teal hover:bg-light-gray hover:text-primary hover:border-2 hover:border-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
                  onClick={handleSubmit}
                >
                Go To the Next Step
                <ArrowRight size={20} className="ml-2" />
            </button>
        </div>
      </>
    )
  }
  return <Loader />
}

export default AIStrategy