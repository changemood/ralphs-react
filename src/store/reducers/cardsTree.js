import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  cardsTree: []
}

const fetchcardsTreeStart = ( state, action ) => {
  return {
    ...state,
    error: null,
    loading: true
  }
};

const fetchcardsTreeSuccess = (state, action) => {
  return {
    ...state,
    cardsTree: action.cardsTree,
    error: null,
    loading: false
  }
};

const fetchcardsTreeFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
};

const updateCardsTreeState = (state, action) => {
  return {
    ...state,
    cardsTree: action.cardsTree,
  }
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FETCH_CARDS_TREE_START: return fetchcardsTreeStart(state, action);
    case actionTypes.FETCH_CARDS_TREE_SUCCESS: return fetchcardsTreeSuccess(state, action);
    case actionTypes.FETCH_CARDS_TREE_FAIL: return fetchcardsTreeFail(state, action);
    case actionTypes.UPDATE_CARDS_TREE_STATE: return updateCardsTreeState(state, action);    
    default: return state;
  }
};

export default reducer