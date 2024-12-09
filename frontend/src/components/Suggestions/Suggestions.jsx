import React , { useState } from 'react';
import { Star} from "lucide-react";
import { useApp } from "context/AppContext"

const Suggestions = ({ setSelectedMsg }) => {

    const { defaultSuggestions } = useApp();
    const [suggestions, setSuggestions] = useState([...defaultSuggestions]);
  
    const handleSuggestionClick = (suggestion) => {
        setSuggestions(prevData => {
          return prevData.map(item => {
            // Create a new object to avoid mutating the original
            if (item.id === suggestion.id && !item.selected) {
              return {
                ...item,
                selected: true, // Update selected property
              };
            }
            return item; // Return the item unchanged
          });
        });
      
        setSelectedMsg(prevSelected => [
          ...prevSelected,
          {
            question: suggestion.question,
            examples: suggestion.examples,
            recommended: suggestion.recommended,
            area:suggestion.text
          }
        ]);
      };

    return (
      <div className="mt-4">
        <h3 className="text-primary text-lg mb-3">Suggestions:</h3>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
              <button
                onClick={() => handleSuggestionClick(suggestion)}
                className={`flex items-center px-4 py-2 rounded-full text-sm transition-all duration-200
                    ${
                        suggestion.selected
                          ? "text-white bg-gradient-to-r from-warm-red to-primary"
                          : "bg-white text-dusky-teal border-2 border-dusky-teal"
                      }
                    `}
              >
                {suggestion.recommended && (
                  <Star size={14} className="mr-2 text-yellow-400" fill="yellow" />
                )}
                {suggestion.text}
              </button>
          ))}
        </div>
      </div>
    );
  };
export default Suggestions