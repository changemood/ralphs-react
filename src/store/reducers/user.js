import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  errors: null,
  loading: false
}

// This is called after auth
const storeUser = ( state, action ) => {
  return {
    ...state,
    user: action.user
  }
};

const updateStart = (state, action) => {
  return {
    ...state,
    loading: true
  }
};

const updateSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    errors: null,
    loading: false
  }
};

const updateFail = (state, action) => {
  return {
    ...state,
    errors: action.errors,
    loading: false
  }
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.STORE_USER: return storeUser(state, action);
    case actionTypes.UPDATE_USER_START: return updateStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS: return updateSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL: return updateFail(state, action);
    default: return state;
  }
};

export default reducer