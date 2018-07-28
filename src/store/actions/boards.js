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

////////////////////////////////////////
///// Manage Boards. create/update/delete
export const manageBoardStart = () => {
  return {
    type: actionTypes.MANAGE_BOARD_START,
  };
};

export const manageBoardSuccess = (board, message) => {
  return {
    type: actionTypes.MANAGE_BOARD_SUCCESS,
    board: board,
    message: message
  };
};

export const manageBoardFail = (message) => {
  return {
    type: actionTypes.MANAGE_BOARD_FAIL,
    message: message
  };
};

// This returns promise so that we can do something after save.
// e.g. show message. and adding the new Board to tree!! etc...
export const createBoard = (data={}) => (dispatch) => {
  return (new Promise((resolve, reject) => {
    dispatch(manageBoardStart());
    axios.post('/v1/boards.json', data)
      .then(response => {
        dispatch(manageBoardSuccess(response.data, "Board is successfully created"));
        resolve();
      })
      .catch(err => {
        dispatch(manageBoardFail(err.response.data));
        reject();
      })
  }))
}

export const updateBoard = () => {
}

export const destroyBoard = () => {
}
