import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig
} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.API_URL
});

const onRequestSuccess = async (config: AxiosRequestConfig) => {
  // TODO: check user token
  return config;
};

const onRequestError = (error: AxiosError) => Promise.reject(error);

const onSuccess = (response: AxiosResponse) => response;
const onError = async (error: AxiosError): Promise<any> => {
  return Promise.reject(error.response);
};

instance.interceptors.request.use(onRequestSuccess, onRequestError);
instance.interceptors.response.use(onSuccess, onError);
// instance.defaults.headers['Cache-Control'] = 'no-cache';

export { instance as fetchInstance };
