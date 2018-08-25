import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  reviewCards: [],
}

const fetchReviewCardsStart = ( state, action ) => {
  return {
    ...state,
    error: null,
    loading: true
  }
};

const fetchReviewCardsSuccess = (state, action) => {
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

const reviwedCard = (state, action) => {
  return {
    ...state,
    reviewCards: state.reviewCards.filter(card => card.id !== action.reviewedCard.id),
  }
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FETCH_REVIEW_CARDS_START: return fetchReviewCardsStart(state, action);
    case actionTypes.FETCH_REVIEW_CARDS_SUCCESS: return fetchReviewCardsSuccess(state, action);
    case actionTypes.FETCH_REVIEW_CARDS_FAIL: return fetchReviewCardsFail(state, action);
    case actionTypes.REVIEW_CARD: return reviwedCard(state, action);
    default: return state;
  }
};

export default reducer