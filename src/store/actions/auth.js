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

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 3600000);
  };
};

export const auth = (authData, type='signUp') => {
  return dispatch => {
    dispatch(authStart());
    let url = `${process.env.REACT_APP_API_URL}/api/v1/users.json`
    if (type === 'login') {
      url = `${process.env.REACT_APP_API_URL}/api/v1/users/sign_in.json`
    }
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 3600000)
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('token', response.data.token);
        dispatch(authSuccess(response.data.token));
        dispatch(checkAuthTimeout(response.data.expires_in));
      })
      .catch(err => {
        let error
        if (type === 'login') {
          error = err.response.data.error
        } else if (type === 'signUp') {
          // sign up can return multiple errors...
          error = err.response.data.errors
        }
        dispatch(authFail(error));
      });
  };
}

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// When user come back before logout and token is still valid
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 3600000 ));
      }
    }
  };
};
