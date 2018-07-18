import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
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

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FETCH_BOARDS_START: return fetchBoardsStart(state, action);
    case actionTypes.FETCH_BOARDS_SUCCESS: return fetchBoardsSuccess(state, action);
    case actionTypes.FETCH_BOARDS_FAIL: return fetchBoardsFail(state, action);
    default: return state;
  }
};

export default reducer