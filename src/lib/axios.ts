import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_BACKEND_API_KEY,
  },
});

export default axiosInstance; 