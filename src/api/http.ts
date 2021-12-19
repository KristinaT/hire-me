import axios from 'axios';

const { REACT_APP_ACCESS_TOKEN, REACT_APP_API_URL } = process.env;

const http = axios.create({
  baseURL: REACT_APP_API_URL,
});

http.interceptors.request.use(config => {
  if (config.method?.toLowerCase() === 'get') {
    config.params = config.params || {};
    config.params['accessToken'] = REACT_APP_ACCESS_TOKEN;
  }

  config.data = config.data || {};

  config.data['accessToken'] = REACT_APP_ACCESS_TOKEN;

  return config;
});

export default http;
