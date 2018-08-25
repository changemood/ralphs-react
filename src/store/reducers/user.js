import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  error: null,
  loading: false
}

const storeUser = ( state, action ) => {
  return {
    ...state,
    user: action.user
  }
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.STORE_USER: return storeUser(state, action);
    default: return state;
  }
};

export default reducer