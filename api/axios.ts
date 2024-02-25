import axios from 'axios';
import { getToken } from '@/utils';

const accessToken = getToken();

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (e) => {
    Promise.reject(e);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (e) => Promise.reject(e),
);
export default instance;
