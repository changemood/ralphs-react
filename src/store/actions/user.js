import axios from '../../utilities';

import * as actionTypes from './actionTypes';

export const updateStart = () => {
  return {
    type: actionTypes.UPDATE_USER_START
  };
};

export const updateSuccess = (user) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user: user
  };
};

export const updateFail = (errors) => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    errors: errors
  };
};

export const updateUser = (userData) => (dispatch) => {
  return (new Promise((resolve, reject) => {
    dispatch(updateStart());
    const url = `${process.env.REACT_APP_API_URL}/v1/users.json`
    axios.patch(url, userData)
      .then(response => {
        dispatch(updateSuccess(response.data));
        resolve();
      })
      .catch(err => {
        dispatch(updateFail(err.response.data.errors));        
        reject();
      })
  }))
}
