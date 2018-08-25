import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

// Store user state after auth, so we can resuse it in profile etc.
export const storeUser = (user) => {
  return {
    type: actionTypes.STORE_USER,
    user: user
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
      // TODO: once we stop storing cookie(need to fix on api side), we can uncomment here.
      // dispatch(logout());
    }, expirationTime * 3600000);
  };
};

export const auth = (authData, type='signUp') => {
  return dispatch => {
    dispatch(authStart());
    let url = `${process.env.REACT_APP_API_URL}/v1/users.json`
    if (type === 'login') {
      url = `${process.env.REACT_APP_API_URL}/v1/users/sign_in.json`
    }
    axios.post(url, authData)
      .then(response => {
        const user = response.data.user
        const expirationDate = new Date(new Date().getTime() + user.expires_in * 3600000)
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('token', user.token);
        dispatch(authSuccess(user.token));
        dispatch(storeUser(user));
        dispatch(checkAuthTimeout(user.expires_in));
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
  localStorage.clear();
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

export const hanleGoogleAuth = (accessToken) => {
  return dispatch => {
    const url = `${process.env.REACT_APP_API_URL}/v1/users/google`
    const params = {
      access_token: accessToken
    }
    axios.post(url, params)
      .then(response => {
        const user = response.data.user
        const expirationDate = new Date(new Date().getTime() + user.expires_in * 3600000)
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('token', user.token);
        dispatch(storeUser(user));
        dispatch(authSuccess(user.token));
        dispatch(checkAuthTimeout(user.expires_in));
      })
      .catch(err => {
        const error = err.response.data.errors
        dispatch(authFail(error));
      });
  }
}
