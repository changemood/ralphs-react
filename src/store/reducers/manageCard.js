import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: null,
  loading: false,
  card: null,
}

const manageCardStart = ( state, action ) => {
  return {
    ...state,
    manage: null,
    loading: true
  }
};

const manageCardSuccess = (state, action) => {
  return {
    ...state,
    card: action.card,
    message: action.message,
    loading: false
  }
};

const manageCardFail = (state, action) => {
  return {
    ...state,
    message: action.message,
    loading: false
  }
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.MANAGE_CARD_START: return manageCardStart(state, action);
    case actionTypes.MANAGE_CARD_SUCCESS: return manageCardSuccess(state, action);
    case actionTypes.MANAGE_CARD_FAIL: return manageCardFail(state, action);
    default: return state;
  }
};

export default reducer