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

// Main component where login happens all the inputs and the login request is managed here
const LoginInputs = ({ goToDashboard }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState([]);

  // To show the alerts to user, whether success or failure (error)
  const { showAlert } = useAlert();

  const { setUser } = useUserStore();

  // function to post login request
  const handleLogin = async (e) => {
    e.preventDefault();

    // Shows loader for user feedback
    setLoading(true);

    try {
      // Await login request
      const response = await login({ email, password });

      if (response.error) {
        showAlert(response.data, 'tomato');
      } else {
        showAlert('Welcome back', 'green');

        // Set the user in zustand on successful login
        setUser({ user: response.data });

        // Divert user to dashboard on success
        goToDashboard();
      }
    } catch (e) {
      showAlert('An unexpected error occurred.', 'tomato');
    } finally {
      // Closes the loader
      setLoading(false);
    }
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
        placeholder="johnsondoe@nomail.com"
        label="Email"
        type="text"
        setValue={setEmail}
        value={email}
        onKeyDown={handleKeyDown}
        data-testid={'login-email'}
      />
      <CustomInputBox
        style={{ marginTop: '30px' }}
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
      <div style={{ marginTop: '30px' }}>
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
