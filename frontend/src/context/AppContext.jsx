import React, { createContext, useContext, useState, useEffect } from "react";
import { suggestions } from "JSONs/suggestions"

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  
  const [defaultSuggestions, setDefaultSuggestions] = useState(suggestions);
  const [defaultRecommendedSuggestions, setDefaultRecommendedSuggestions] = useState([]);
  const [LinkedAIArea, setLinkedAIArea] = useState([]);
  const [responsibleAIUse, setResponsibelAIUse] = useState([]);
  const [techEnableValues, setTechEnableValues] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const handleDefaultSuggestions = (suggetions) => {
    setDefaultSuggestions(suggetions);
  };

  const handleResultValues = (values) => {
    setLinkedAIArea(values.opportunities);
    setResponsibelAIUse(values.ai_responsible_use);
    setTechEnableValues(values.tech_enablement)
  }

  useEffect(()=>{
    const recommended = defaultSuggestions.filter(suggestion => suggestion.recommended);
    setDefaultRecommendedSuggestions(recommended)
  },[defaultSuggestions]);

  const value = {
    LinkedAIArea,
    responsibleAIUse,
    techEnableValues,
    defaultSuggestions,
    defaultRecommendedSuggestions,
    handleDefaultSuggestions,
    handleResultValues,
    userDetails,
    setUserDetails,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
