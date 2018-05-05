import client from 'axios';

export const axios = () => {
  let instance = client.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // interceptors do something before request sent...
  // here we add token before request sent. without interceptors,
  // localStorage.getItem('token') returns null without refresh browser...
  // https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });
  return instance;
}

export default axios();