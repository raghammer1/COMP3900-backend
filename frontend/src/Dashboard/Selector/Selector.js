import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SelectorLogo from '../../components/SelectorLogo';
import MainSelectors from './MainSelectors';
import useValidatorStore from '../../zustand/useValidatorStore';
import useUserStore from '../../zustand/useUserStore';
import { googleLogout } from '@react-oauth/google';
import usePdfStore from '../../zustand/usePdfStore';

// Main component to set all the selector settings on the main dashboard
const Selector = () => {
  const navigate = useNavigate();
  const clearValidatorData = useValidatorStore(
    (state) => state.clearValidatorData
  );
  const clearUser = useUserStore((state) => state.clearUser);
  const clearPdfData = usePdfStore((state) => state.clearPdfData);

  // Additional logout handler for user on the main dashboard (CLEANS EVERYTHING!)
  const handleLogout = () => {
    googleLogout(); // Logs out from Google
    localStorage.clear(); // Clears local storage
    Cookies.remove('token', { path: '/' }); // Removes the authentication token cookie
    clearValidatorData(); // Clears validator data from the store
    clearPdfData(); // Clears PDF data from the store
    clearUser(); // Clears user data from the store
    navigate('/'); // Navigates to the home page
  };

  // Here, we return the JSX for rendering the selector settings
  return (
    <div style={{ height: '80%' }}>
      <SelectorLogo link={'/dashboard/main'} />{' '}
      {/* Displays the selector logo linking to the main dashboard */}
      <MainSelectors handleLogout={handleLogout} />{' '}
      {/* Displays the main selectors with logout functionality */}
    </div>
  );
};

export default Selector;
