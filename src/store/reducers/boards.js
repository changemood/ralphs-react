import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  board: null,
  boards: []
}

const fetchBoardsStart = ( state, action ) => {
  return {
    ...state,
    error: null,
    loading: true
  }
};

const fetchBoardsSuccess = (state, action) => {
  return {
    ...state,
    boards: action.boards,
    error: null,
    loading: false
  }
};

const fetchBoardsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
};

// These manageBoard... is for create/update/destroy
const manageBoardStart = ( state, action ) => {
  return {
    ...state,
    manage: null,
    loading: true
  }
};

const manageBoardSuccess = (state, action) => {
  return {
    ...state,
    board: action.board,
    message: action.message,
    loading: false
  }
};

const manageBoardFail = (state, action) => {
  return {
    ...state,
    message: action.message,
    loading: false
  }
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FETCH_BOARDS_START: return fetchBoardsStart(state, action);
    case actionTypes.FETCH_BOARDS_SUCCESS: return fetchBoardsSuccess(state, action);
    case actionTypes.FETCH_BOARDS_FAIL: return fetchBoardsFail(state, action);
    case actionTypes.MANAGE_BOARD_START: return manageBoardStart(state, action);
    case actionTypes.MANAGE_BOARD_SUCCESS: return manageBoardSuccess(state, action);
    case actionTypes.MANAGE_BOARD_FAIL: return manageBoardFail(state, action);
    default: return state;
  }
};

export default reducer