import axiosService from 'services/AxiosService';
import { extractApiErrors } from './index';
const { houseshareAxios } = axiosService;

export const registerUser = (registerData) => {
  return houseshareAxios
    .post('/users/register', registerData)
    .catch((error) => Promise.reject(extractApiErrors(error.response || [])));
};

export const loginUser = (loginData) => {
  return houseshareAxios
    .post('/users/login', loginData)
    .then((res) => res.data)
    .catch((error) => Promise.reject(extractApiErrors(error.response || [])));
};

export const userAuthenticated = (decodedToken) => {
  return {
    type: 'USER_AUTHENTICATED',
    username: decodedToken.username || '',
  };
};
