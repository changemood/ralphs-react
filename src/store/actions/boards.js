import axios from '../../utilities';

import * as actionTypes from './actionTypes';

export const fetchBoardsStart = () => {
  return {
    type: actionTypes.FETCH_BOARDS_START,
  };
};

export const fetchBoardsSuccess = (boards) => {
  return {
    type: actionTypes.FETCH_BOARDS_SUCCESS,
    boards: boards
  };
};

export const fetchBoardsFail = (error) => {
  return {
    type: actionTypes.FETCH_BOARDS_FAIL,
    error: error
  };
};

export const fetchBoards = () => {
  return dispatch => {
    dispatch(fetchBoardsStart());
    axios.get('/v1/boards.json')
    .then(response => {
      dispatch(fetchBoardsSuccess(response.data));
    })
    .catch(err => {
      dispatch(fetchBoardsFail(err.response.data));      
    })
  };
}
