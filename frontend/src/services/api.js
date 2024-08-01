import axios from 'axios';
import apiClient from './client';

// API to send the login requests
export const login = async (data) => {
  try {
    return await apiClient.post('/auth/login', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to send the register request
export const register = async (data) => {
  try {
    return await apiClient.post('/auth/register', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to send the login/register request for Google auth users
export const googleLoginBackend = async (data) => {
  try {
    return await apiClient.post('/auth/google-login', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to delete a user account
export const deleteUserAccount = async (data) => {
  try {
    return await apiClient.post('/auth/delete-user-account', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to send a request to send email for reset password
export const forgotPassword = async (data) => {
  try {
    return await apiClient.post('/auth/forgot-password', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to reset the user password on success
export const resetPassword = async (data) => {
  try {
    return await apiClient.post('/auth/reset-password', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to convert PDF to UBL XML
export const pdfToUblConvert = async (formData) => {
  try {
    const response = await apiClient.post('/convert/upload-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

// API to convert GUI Form to UBL XML
export const guiFormToUblConvert = async (data) => {
  try {
    const response = await apiClient.post('/convert/gui-form', data);
    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

// API to send UBL to backend for validation
export const validateUBL = async (formData) => {
  try {
    const response = await apiClient.post('/validate/validate-ubl', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

// API to change profile photo
export const changeProfilePhoto = async (formData) => {
  try {
    const response = await apiClient.post(
      '/edit/change-profile-photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

// API to set a new username
export const changeUsername = async (data) => {
  try {
    return await apiClient.put('/edit/change-username', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to get validation info from user schema
export const getAllValidationUblInfo = async (data) => {
  try {
    const response = await apiClient.get('/validate/get-all-validation-data', {
      params: { userId: data.userId },
    });

    return response.data.ublValidation;
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to give another user access to the same validation-UBL files
export const giveAccessValidationUbl = async (data) => {
  try {
    return await apiClient.post('/give-access-validation-ubl', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to give another user access to the same conversion PDF files
export const giveAccessPdfUbl = async (data) => {
  try {
    return await apiClient.post('/give-access-convertion-ubl', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to get the historyEmail array for the user
export const getHistoryEmail = async () => {
  try {
    const response = await apiClient.get('/history-email');
    return response.data;
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to get the historyEmail array for the user by ID
export const getHistoryEmailById = async (data) => {
  try {
    const response = await apiClient.get('/get-history-email-by-id', {
      params: { ...data },
    });
    return response.data;
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to get PDF info from user schema
export const getAllPdfInfo = async (data) => {
  try {
    const response = await apiClient.get('/convert/get-all-convertion-data', {
      params: { userId: data.userId },
    });

    return response.data.pdfUblValidation;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

// API to delete one record for validation data from backend and also the corresponding files
export const deleteOnePdfInfo = async (data) => {
  try {
    const response = await apiClient.delete(
      '/convert/delete-one-convertion-data',
      {
        params: { userId: data.userId, dataId: data.dataId },
      }
    );

    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

// API to delete one record for validation data from backend and also the corresponding files
export const deleteOneValidationUblInfo = async (data) => {
  try {
    const response = await apiClient.delete(
      '/validate/delete-one-validation-data',
      {
        params: { userId: data.userId, dataId: data.dataId },
      }
    );

    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

// API to get any particular file from the backend
export const getAnyFile = async (data) => {
  try {
    const response = await apiClient.get('/getFile', {
      params: { fileId: data.fileId },
      responseType: 'arraybuffer',
    });

    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

// API to send particular file/files to a user's email
export const sendFileToEmail = async (data) => {
  try {
    return await apiClient.post('/sendFile', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

// API to get the weather data from the weatherAPI
const API_KEY = 'ac9b9c9cdde741b99b310610242006';
export const fetchWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      'http://api.weatherapi.com/v1/current.json',
      {
        params: {
          key: API_KEY,
          q: `${lat},${lon}`,
          aqi: 'no',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

// API to get the thought of the day from the rapidAPI
const STORAGE_KEY = 'thoughtOfTheDay';
export async function getThoughtOfTheDay() {
  try {
    const cachedThought = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (cachedThought) {
      const { timestamp, thought } = cachedThought;

      if (isSameDay(new Date(timestamp), new Date())) {
        return thought;
      }
    }

    const response = await axios({
      method: 'GET',
      url: 'https://thought-of-the-day.p.rapidapi.com/thought',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-rapidapi-ua': 'RapidAPI-Playground',
        'x-rapidapi-key': '932c70556bmshcd7268d8daf9f23p1fc442jsnb178dc8066e1',
        'x-rapidapi-host': 'thought-of-the-day.p.rapidapi.com',
      },
    });

    const thought = response.data;
    const currentTimestamp = new Date().getTime();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ timestamp: currentTimestamp, thought })
    );

    return thought;
  } catch (error) {
    return null;
  }
}

// Helper function to check if two dates are the same day
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Google API to get user info from the generated access token
export const fetchGoogleUserInfo = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Google user info');
  }
};
