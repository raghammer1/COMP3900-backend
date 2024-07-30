import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Create a root for React DOM rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application with Google OAuth provider and strict mode
root.render(
  <GoogleOAuthProvider clientId="968770887167-tbnshf3gh81ftkc9ktnqkk2vil59h4f6.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
