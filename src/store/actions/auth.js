import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const signUp = (email, userName, password, passwordConfirmation) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      user: {
        email: email,
        username: userName,
        password: password,
        password_confirmation: passwordConfirmation,
      }
    };
    const url = 'http://localhost:5000/api/v1/users.json';
    axios.post(url, authData)
      .then(response => {
        dispatch(authSuccess(response.data.token));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.errors));
      });
  };
};
