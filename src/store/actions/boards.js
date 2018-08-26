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

export const fetchBoard = (id) => {
  return dispatch => {
    axios.get(`/v1/boards/${id}.json`)
    .then(response => {
      dispatch(setBoard(response.data));
    })
    .catch(err => {
      dispatch(fetchBoardsFail(err.response.data));
    })
  };
}

// This is used when user click link from /boards
// So we don't have to request board again.
export const setBoard = (board) => {
  return {
    type: actionTypes.SET_BOARD,
    board: board
  }
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

export const updateBoard = (board={}) => (dispatch) => {
  return (new Promise((resolve, reject) => {
    dispatch(manageBoardStart());
    axios.patch(`/v1/boards/${board.id}.json`, board)
      .then(response => {
        dispatch(manageBoardSuccess(response.data, "Board is successfully updated"));
        resolve();
      })
      .catch(err => {
        dispatch(manageBoardFail(err.response.data));
        reject();
      })
  }))
}

export const destroyBoard = () => {
}
