import axios, { AxiosError } from 'axios';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { StatusCodeMapping } from '../const';
import { getToken } from './token';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type MessageType = {
  type: string;
  message: string;
}

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if(token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<MessageType>) => {
      if(error.response && StatusCodeMapping[error.response.status]) {
        toast.warn(error.response.data.message);
      }
      throw error;
    });

  return api;
};

export default createAPI;

