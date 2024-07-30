import axios from 'axios';

// Create an instance of axios with a base URL and withCredentials set to true
const apiClient = axios.create({
  baseURL: 'http://localhost:5003', // Base URL for all requests
  withCredentials: true, // Allow credentials (such as cookies) to be sent with requests
});

// Add an interceptor to handle responses and errors globally
apiClient.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  (error) => {
    console.error('Axios interceptor error:', error); // Log the error for debugging purposes
    return Promise.reject(error); // Reject the promise with the error, allowing error handling in the calling code
  }
);

export default apiClient;
