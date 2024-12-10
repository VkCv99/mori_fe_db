import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [defaultSuggestions, setDefaultSuggestions] = useState([]);
  const [defaultRecommendedSuggestions, setDefaultRecommendedSuggestions] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [FinalresultValues, setFinalResultValues] = useState([]);

  const handleDefaultSuggestions = (suggetions) => {
    setDefaultSuggestions(suggetions);
  };

  const getPreviousPath = () => {
    const path = location.pathname;
    const pathMap = {
        "/business-context": "/",
        "/value-areas": "/business-context",
        "/opportunities": "/value-areas",
        "/ai-applications": "/opportunities",
        "/ai-use": "/ai-applications",
        "/ai-tech-enablement": "/ai-use",
        "/final-result": "/ai-tech-enablement"
    };
    return navigate(pathMap[path] || "/");
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
    setFinalResultValues,
    getPreviousPath
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
