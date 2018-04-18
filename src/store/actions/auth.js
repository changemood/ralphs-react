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

export const auth = (authData, type='signUp') => {
  return dispatch => {
    dispatch(authStart());
    let url = 'http://localhost:5000/api/v1/users.json'
    if (type === 'login') {
      url = 'http://localhost:5000/api/v1/users/sign_in.json'
    }
    axios.post(url, authData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch(authSuccess(response.data.token));
      })
      .catch(err => {
        // sign up can return multiple errors...
        let error = err.response.data.errors
        if (type === 'login') error = err.response.data.error
        dispatch(authFail(error));
      });
  };
}
