import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5003', // Base URL for all requests.
  withCredentials: true,
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios interceptor error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
