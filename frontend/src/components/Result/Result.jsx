import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { ArrowRight, ArrowDown } from 'lucide-react';
// import { useApp } from "context/AppContext";
import ResultCard from "components/Result/ResultCard"
import useAxios from "hooks/useAxios";

function Result({step, resultValues}) {
  
    const navigate = useNavigate();
    const { baseUrl } = useAxios()
    // const { resultValues } = useApp();
    const [selectedCards, setSelectedCards] = useState([]);

    const handleCardSelect = (cardName) => {
      setSelectedCards(prevSelected => {
        if (prevSelected.includes(cardName)) {
          return prevSelected.filter(name => name !== cardName);
        } else {
          return [...prevSelected, cardName];
        }
      });
    };

    const generateAndDownloadPPT = async (type) => {
      try {
        console.log("selectedCards", selectedCards, type)
        const response = await axios.post(
          `${baseUrl}generate-ppt`,
          {
            type: type, 
            selected_cards: selectedCards,
          },
          {
            responseType: "blob", // Important: This tells axios to treat the response as binary data
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
            navigate("/ai-responsible-use")
        } else {
            navigate("/ai-tech-enablement")
        }
    }

    return (
        <div className="h-full overflow-y-auto w-full p-6 bg-gray-800 bg-opacity-30 rounded-lg backdrop-blur-sm overflow-hidden">
            {
              resultValues.map((currentArea, index) => (
                <ResultCard 
                  key={index} 
                  currentArea={currentArea} 
                  step={step} 
                  isSelected={selectedCards.includes(currentArea.name)}
                  onSelect={handleCardSelect}
                />
              ))
            }
            {step !== 3 ? <button 
                className={`w-full space-x-2 p-2 rounded-lg border transition duration-200 flex items-center justify-center mb-4
                    bg-white text-dusky-teal hover:bg-light-gray hover:text-primary hover:border-2 hover:border-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
                  onClick={handleSubmit}
                >
                Go To the Next Step
                <ArrowRight size={20} className="ml-2" />
            </button> : 
        <div className="flex space-x-4 mb-4">
          <button 
              className={`w-full p-2 rounded-lg border transition duration-200 flex items-center justify-center
                  bg-white text-dusky-teal hover:bg-light-gray hover:text-primary 
                  hover:border-2 hover:border-primary 
                  hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
              onClick={()=>generateAndDownloadPPT("comprehensive")}
          >
              Download Comprehensive Report
              <ArrowDown size={20} className="ml-2" />
          </button>
      
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
        </div>
        }
        </div>
    );
}

export default Result