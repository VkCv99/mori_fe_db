import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { ArrowRight, ArrowDown } from 'lucide-react';
// import { useApp } from "context/AppContext";
import ResultCard from "components/Result/ResultCard"
import useAxios from "hooks/useAxios";
import OpportunitiesCard from './OpportunitiesCard';
import AIResponsibleUseCard from './AIResponsibleUseCard';

function Result({step, resultValues}) {
  
    const navigate = useNavigate();
    const { baseUrl } = useAxios()
    const [selectedCards, setSelectedCards] = useState([]);

    const handleCardSelect = (card) => {
      setSelectedCards(prevSelected => {
        if (prevSelected.some(oldCard => oldCard.id === card.id)) {
          return prevSelected.filter(oldCard => oldCard.id !== card.id);
        } else {
          return [...prevSelected, card];
        }
      });
    };

    const generateAndDownloadPPT = async (type) => {
      try {
        const userId = localStorage.getItem("userid");
        const response = await axios.post(
          `${baseUrl}generate-ppt`,
          {
            type: type, 
            selected_cards: selectedCards.length ? selectedCards : resultValues,
          },
          {
            responseType: "blob",
            headers :{
              "user-id": userId
            }
          }
        );
  
        // Create a Blob from the response data
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        });
  
        // Create a link element and trigger the download
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = type === "short" ? "short_presentation.pptx" : "presentation.pptx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating PPT:", error);
      }
    };

    const handleSubmit = () => {
        if(step === 1){
            navigate("/ai-applications")
        } else {
            navigate("/ai-tech-enablement")
        }
    }

    return (
        <div className="h-full overflow-y-auto w-full p-6 bg-gray-800 bg-opacity-30 rounded-lg backdrop-blur-sm overflow-hidden">
            {
              resultValues.map((currentArea, index) => {
                if(step === 1){
                  return <OpportunitiesCard key={`opportunities_${index}`} currentArea={currentArea} />
                } else if(step === 2){
                  return <AIResponsibleUseCard key={`ai_use_${index}`} currentArea={currentArea}/>
                }else{
                  return <ResultCard 
                    key={`result_${index}`} 
                    currentArea={currentArea} 
                    step={step} 
                    isSelected={selectedCards.some(oldCard => oldCard.id === currentArea.id)}
                    onSelect={handleCardSelect}
                  />
                }
                
              } )
            }
            {resultValues.length ?
            (step !== 3 ? <button 
                className={`w-full space-x-2 p-2 rounded-lg border transition duration-200 flex items-center justify-center mb-4
                    bg-white text-dusky-teal hover:bg-light-gray hover:text-primary hover:border-2 hover:border-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
                  onClick={handleSubmit}
                >
                Go To the Next Step
                <ArrowRight size={20} className="ml-2" />
            </button> : 
              <div className="flex space-x-4 mb-4">
                {/* <button 
                    className={`w-full p-2 rounded-lg border transition duration-200 flex items-center justify-center
                        bg-white text-dusky-teal hover:bg-light-gray hover:text-primary 
                        hover:border-2 hover:border-primary 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
                    onClick={()=>generateAndDownloadPPT("comprehensive")}
                >
                    Download Comprehensive Report
                    <ArrowDown size={20} className="ml-2" />
                </button> */}
            
                <button 
                    className={`w-full p-2 rounded-lg border transition duration-200 flex items-center justify-center
                        bg-white text-dusky-teal hover:bg-light-gray hover:text-primary 
                        hover:border-2 hover:border-primary 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
                    onClick={() => generateAndDownloadPPT("short")}
                >
                  Download Summary Report
                    <ArrowDown size={20} className="ml-2" />
                </button>
              </div>)
            : null}
        </div>
    );
}

export default Result