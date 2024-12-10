import React, { createContext, useContext, useState, useEffect } from "react";


// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [defaultSuggestions, setDefaultSuggestions] = useState([]);
  const [defaultRecommendedSuggestions, setDefaultRecommendedSuggestions] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [FinalresultValues, setFinalResultValues] = useState([]);

  const handleDefaultSuggestions = (suggetions) => {
    setDefaultSuggestions(suggetions);
  };

  useEffect(()=>{
    const recommended = defaultSuggestions.filter(suggestion => suggestion.recommended);
    setDefaultRecommendedSuggestions(recommended)
  },[defaultSuggestions]);

  const value = {
    defaultSuggestions,
    defaultRecommendedSuggestions,
    handleDefaultSuggestions,
    userDetails,
    setUserDetails,
    FinalresultValues,
    setFinalResultValues
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
