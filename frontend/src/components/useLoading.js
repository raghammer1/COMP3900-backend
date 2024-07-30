import React, { useState, useContext, createContext } from 'react';
import LoadingIndicator from './LoadingIndicator';

// Create a context for loading state
const LoadingContext = createContext();

// Provider component to wrap around parts of the app that need loading state
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator

  // Function to show the loading indicator
  const show = () => setIsLoading(true);
  // Function to hide the loading indicator
  const hide = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {children}
      {isLoading && <LoadingIndicator />}{' '}
      {/* Conditionally render the loading indicator */}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider'); // Ensure the hook is used within a provider
  }
  return context;
};
