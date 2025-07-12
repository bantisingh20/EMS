import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const location = useLocation();
  
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};