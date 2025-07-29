// app/api/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // @ts-ignore
    config.headers = {
      ...config.headers,
      'X-Secret-Key': process.env.API_SECRET_KEY || '',
      'Origin': process.env.ALLOWED_ORIGIN || 'http://localhost:4000',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
