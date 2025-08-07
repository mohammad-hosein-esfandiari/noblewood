import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.WP_API_URL || 'http://noblewood.local/wp-json/custom/v1',
});

axiosInstance.interceptors.request.use(
  (config:any) => {
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

