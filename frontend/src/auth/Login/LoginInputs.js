import React from 'react';
import { useState } from 'react';
import CustomInputBox from '../../components/CustomInputBox';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import ForgotPassword from './ForgotPassword';
import RedirectToRegister from './RedirectToRegister';
import { useAlert } from '../../components/AlertError';
import { login } from '../../services/api';
import useUserStore from '../../zustand/useUserStore';
import GoogleAuth from '../GoogleAuth';

// Main component where login happens. All the inputs and the login request are managed here
const LoginInputs = ({ goToDashboard }) => {
  const [email, setEmail] = useState(''); // State to manage the email input
  const [password, setPassword] = useState(''); // State to manage the password input
  const [loading, setLoading] = useState(false); // State to manage the loading indicator
  const [newUser, setNewUser] = useState([]); // State to manage new user data from GoogleAuth

  // To show alerts to the user, whether success or failure (error)
  const { showAlert } = useAlert();

  const { setUser } = useUserStore(); // Zustand store hook to set user data

  // This function posts the login request
  const handleLogin = async (e) => {
    e.preventDefault();

    // Show loader for user feedback
    setLoading(true);

    const response = await login({ email, password });

    if (response.error) {
      // Show error alert
      showAlert(response.data.error, 'tomato');
    } else {
      // Show success alert
      showAlert('Welcome back', 'green');

      // Set the user in Zustand on successful login
      setUser({ user: response.data });

      // Redirect user to dashboard on success
      goToDashboard();
    }

    // Hide loader
    setLoading(false);
  };

  // To handle the enter key press and then start the login process
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div
      style={{
        padding: '40px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <p style={{ margin: '0', fontSize: '12.8px' }}>WELCOME BACK</p>
      <h2
        style={{
          margin: '0',
          fontSize: '25px',
          marginTop: '16px',
          marginBottom: '50px',
        }}
      >
        Log In to your Account
      </h2>
      <CustomInputBox
        style={{ width: '80%' }}
        placeholder="johnsondoe@nomail.com"
        label="Email"
        type="text"
        setValue={setEmail}
        value={email}
        onKeyDown={handleKeyDown}
        data-testid={'login-email'}
      />
      <CustomInputBox
        style={{ marginTop: '30px', width: '80%' }}
        placeholder="########"
        label="Password"
        type="password"
        setValue={setPassword}
        value={password}
        onKeyDown={handleKeyDown}
        data-testid={'login-password'}
      />
      <ForgotPassword />
      <CustomPrimaryButton
        label="CONTINUE"
        bgcolour="#651FFF"
        additionalStyle={{
          width: '92%',
          height: '50px',
          fontSize: '13px',
        }}
        onClick={handleLogin}
        dataTestid={'login-submit'}
      />

      <RedirectToRegister />
      <div style={{ marginTop: '30px', width: '90%' }}>
        <GoogleAuth
          setNewUser={setNewUser}
          newUser={newUser}
          goToDashboard={goToDashboard}
        />
      </div>

      {loading && <LoadingIndicator />}
    </div>
  );
};

export default LoginInputs;
