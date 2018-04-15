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
    idToken: token
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const signUp = (email, password, passwordConfirmation) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,            
    };
    const url = 'https://ralphs.herokuapp.com/api/v1/users';
    axios.post(url, authData)
      .then(response => {
          dispatch(authSuccess(response.data.token));
      })
      .catch(err => {
          dispatch(authFail(response.data.errors));
      });
  };
};
