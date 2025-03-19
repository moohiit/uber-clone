import React, { createContext, useContext, useState } from 'react';

// Create the CaptainContext
export const CaptainDataContext = createContext();
// Custom hook to use the CaptainContext
export const useCaptain = () => {
  return useContext(CaptainDataContext);
};
// Create a provider component
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  }

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain
  }

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
