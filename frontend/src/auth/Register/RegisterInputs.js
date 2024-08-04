import React, { useState } from 'react';
import CustomInputBox from '../../components/CustomInputBox';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import RedirectToLogin from './RedirectToLogin';
import { useAlert } from '../../components/AlertError';
import { validateEmail, validatePassword } from '../../shared/validators';
import { register } from '../../services/api';
import useUserStore from '../../zustand/useUserStore';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import GoogleAuth from '../GoogleAuth';

/** Main component for user registration inputs and handling registration process */
const RegisterInputs = ({ goToDashboard }) => {
  const [name, setName] = useState(''); // State to manage user's name input
  const [email, setEmail] = useState(''); // State to manage user's email input
  const [password, setPassword] = useState(''); // State to manage user's password input
  const [checkPassword, setCheckPassword] = useState(''); // State to confirm password input

  const [newUser, setNewUser] = useState([]); // State to manage new user data from GoogleAuth

  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const { showAlert } = useAlert(); // Custom hook to show alert messages

  const { setUser } = useUserStore(); // Zustand store hook to set user data

  // This function handles the registration process
  const submitRegister = async () => {
    if (name === '') {
      showAlert('Name cannot be empty', 'tomato');
      return;
    }
    if (!validateEmail(email)) {
      showAlert('Email is not valid', 'tomato');
      return;
    }
    if (password !== checkPassword) {
      showAlert('Passwords do not match', 'tomato');
      return;
    }

    if (!validatePassword(password)) {
      showAlert('Password does not match criteria', 'tomato');
      return;
    }

    setLoading(true);
    const response = await register({ username: name, email, password });
    if (response.error) {
      showAlert(
        response.data.error ? response.data.error : "Can't Register",
        'tomato'
      );
    } else {
      showAlert(`Welcome ${name}`, 'green');
      setUser({ user: response.data });
      goToDashboard();
    }

    setLoading(false);
  };

  // This function handles the 'Enter' key press to submit the registration form
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitRegister(e);
    }
  };

  return (
    <div
      style={{
        padding: '40px',
        width: '100%',
      }}
    >
      <p style={{ margin: '0', fontSize: '12.8px' }}>LET'S GET YOU STARTED</p>
      <h2
        style={{
          margin: '0',
          fontSize: '25px',
          marginTop: '16px',
          marginBottom: '50px',
        }}
      >
        Create an Account
      </h2>
      <CustomInputBox
        style={{ width: '80%' }}
        placeholder="Johnson Doe"
        label="Your Name"
        type="text"
        setValue={setName}
        value={name}
        onKeyDown={handleKeyDown}
        data-testid={'register-name'}
      />
      <CustomInputBox
        style={{ width: '80%' }}
        placeholder="johnsondoe@nomail.com"
        label="Email"
        type="text"
        setValue={setEmail}
        value={email}
        onKeyDown={handleKeyDown}
        data-testid={'register-email'}
      />
      <div style={{ position: 'relative', marginTop: '30px' }}>
        <CustomInputBox
          style={{ width: '80%' }}
          placeholder="########"
          label="Password"
          type="password"
          setValue={setPassword}
          value={password}
          onKeyDown={handleKeyDown}
          data-testid={'register-password'}
        />
        <Tooltip title="Password must be at least 8 characters long and include at least one number, one special character, and one uppercase letter">
          <InfoIcon
            style={{
              position: 'absolute',
              right: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      </div>
      <CustomInputBox
        style={{ marginTop: '30px', width: '80%' }}
        placeholder="########"
        label="Password"
        type="password"
        setValue={setCheckPassword}
        value={checkPassword}
        onKeyDown={handleKeyDown}
        data-testid={'register-check-password'}
      />
      <CustomPrimaryButton
        label="CONTINUE"
        bgcolour="#651FFF"
        additionalStyle={{
          width: '92%',
          height: '50px',
          fontSize: '13px',
        }}
        onClick={submitRegister}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            submitRegister(e);
          }
        }}
        dataTestid={'register-submit'}
      />

      <RedirectToLogin />
      <div style={{ width: '90%' }}>
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

export default RegisterInputs;
