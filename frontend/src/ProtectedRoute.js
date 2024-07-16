import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  const token = Cookies.get('token');

  console.log(token);

  if (token == null || token === '') {
    return <Navigate to="/login" />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const initializeAndAuthenticate = async () => {
      setIsInitialized(true);
    };

    initializeAndAuthenticate();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
