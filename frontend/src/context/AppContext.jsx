import React, { createContext, useContext, useState, useEffect } from "react";


// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [defaultSuggestions, setDefaultSuggestions] = useState([]);
  const [defaultRecommendedSuggestions, setDefaultRecommendedSuggestions] = useState([]);
  const [LinkedAIArea, setLinkedAIArea] = useState([]);
  const [responsibleAIArea, setResponsibelAIArea] = useState([]);
  const [techEnableValues, setTechEnableValues] = useState([]);


  const handleDefaultSuggestions = (suggetions) => {
    setDefaultSuggestions(suggetions);
  };

  const handleResultValues = (values) => {
    setLinkedAIArea(values.opportunities);
    setResponsibelAIArea(values.ai_responsible_use);
    setTechEnableValues(values.tech_enablement)
  }

  useEffect(()=>{
    const recommended = defaultSuggestions.filter(suggestion => suggestion.recommended);
    setDefaultRecommendedSuggestions(recommended)
  },[defaultSuggestions]);

  const value = {
    LinkedAIArea,
    responsibleAIArea,
    techEnableValues,
    defaultSuggestions,
    defaultRecommendedSuggestions,
    handleDefaultSuggestions,
    handleResultValues,
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
