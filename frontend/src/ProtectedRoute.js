import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// ProtectedRoute component to protect routes based on authentication
const ProtectedRoute = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false); // State to check if the component is initialized

  const token = Cookies.get('token'); // Get the authentication token from cookies

  // If no token or token is an empty string, redirect to login page
  if (token == null || token === '') {
    return <Navigate to="/login" />;
  }

  // Use useEffect to run the initialization and authentication logic
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const initializeAndAuthenticate = async () => {
      setIsInitialized(true); // Set the initialization state to true after authenticating
    };

    initializeAndAuthenticate(); // Call the initialization and authentication function
  }, []);

  // If not initialized, show a loading indicator
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  // Render the children components if authenticated and initialized
  return children;
};

export default ProtectedRoute;
