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

const RegisterInputs = ({ goToDashboard }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [newUser, setNewUser] = useState([]);

  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const { setUser } = useUserStore();

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
    try {
      const response = await register({ username: name, email, password });
      if (response.error) {
        showAlert(response.data, 'tomato');
      } else {
        showAlert(`Welcome ${name}`, 'green');
        console.log(response.data);
        setUser({ user: response.data });
        goToDashboard();
      }
    } catch (e) {
      showAlert('An unexpected error occurred.', 'tomato');
    } finally {
      setLoading(false);
    }
  };

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
        placeholder="Johnson Doe"
        label="Your Name"
        type="text"
        setValue={setName}
        value={name}
        onKeyDown={handleKeyDown}
        data-testid={'register-name'}
      />
      <CustomInputBox
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
        style={{ marginTop: '30px' }}
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
      <GoogleAuth
        setNewUser={setNewUser}
        newUser={newUser}
        goToDashboard={goToDashboard}
      />

      {loading && <LoadingIndicator />}
    </div>
  );
};
export default RegisterInputs;
