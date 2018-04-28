import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  reviewCards: []
}

const fetchReviewCardsStart = ( state, action ) => {
  return {
    ...state,
    error: null,
    loading: true
  }
};

const fetchReviewCardsSuccess = (state, action) => {
  console.log(action.reviewCards)
  return {
    ...state,
    reviewCards: action.reviewCards,
    error: null,
    loading: false
  }
};

const fetchReviewCardsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FETCH_REVIEW_CARDS_START: return fetchReviewCardsStart(state, action);
    case actionTypes.FETCH_REVIEW_CARDS_SUCCESS: return fetchReviewCardsSuccess(state, action);
    case actionTypes.FETCH_REVIEW_CARDS_FAIL: return fetchReviewCardsFail(state, action);
    default: return state;
  }
};

export default reducer