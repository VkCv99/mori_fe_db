import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowRight } from 'lucide-react';
import Loader from 'common/Loader';
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import useAxios from "hooks/useAxios"
import AIResponsibleUsePPT from "../assets/ppts/ai_responsible_use.pptx";
import AIStrategyCard from 'components/Result/AIStrategyCard';

function AIStrategy() {
  const navigate = useNavigate();
  const { getCall, postCall } = useAxios();
  const [aiStrategies, setAiStrategies] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardSelect = (card) => {
    setSelectedCards(prevSelected => {
      const isSelected = prevSelected.some(item => item.category_name === card.category_name);
      
      if (isSelected) {
        return prevSelected.filter(item => item.category_name !== card.category_name);
      } else {
        return [...prevSelected, card];
      }
    });
  };

  const checkIsSelected = (category_name) => {
    return selectedCards.some(item => item.category_name === category_name)
  }

  const handleSubmit = async() => {
    const startegy = Object.keys(selectedCards).length ? selectedCards : aiStrategies;
    const result = await postCall("save-ai-strategy", startegy);
      if(result.success){
        navigate("/ai-responsible-use")
      } else {
        toast.warn(`${result.error}`)
      }
  }
  
  useEffect(()=>{
    getCall("fetch-ai-strategy").then((result)=>{
      setAiStrategies(result.data)
    })
  },[])

  if(aiStrategies.length){
    return (
      <>
          <Breadcrumb pageName="AI Strategy" ppt={AIResponsibleUsePPT}/>
          <div className="h-full overflow-y-auto w-full p-6 bg-gray-800 bg-opacity-30 rounded-lg backdrop-blur-sm overflow-hidden">
            {aiStrategies.map((aiStrategy, index) => (
               <AIStrategyCard 
                index={index}
                app={aiStrategy}
                isSelected={checkIsSelected(aiStrategy.category_name)}
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