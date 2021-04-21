import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  CancelTokenStatic
} from 'axios';

interface FetchInstance extends AxiosInstance {
  CancelToken: CancelTokenStatic;
  isCancel: (value: unknown) => boolean;
}

const instance = axios.create({
  baseURL: process.env.API_URL
}) as FetchInstance;

const onRequestSuccess = async (config: AxiosRequestConfig) => {
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

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export { instance as fetchInstance };
