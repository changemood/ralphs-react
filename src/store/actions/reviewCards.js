import axios from '../../utilities';

import * as actionTypes from './actionTypes';

export const fetchReviewCardsStart = () => {
  return {
    type: actionTypes.FETCH_REVIEW_CARDS_START,
  };
};

export const fetchReviewCardsSuccess = (reviewCards) => {
  return {
    type: actionTypes.FETCH_REVIEW_CARDS_SUCCESS,
    reviewCards: reviewCards
  };
};

export const fetchReviewCardsFail = (error) => {
  return {
    type: actionTypes.FETCH_REVIEW_CARDS_FAIL,
    error: error
  };
};

export const fetchReviewCards = () => {
  return dispatch => {
    dispatch(fetchReviewCardsStart());
    axios.get('/api/v1/cards/review_cards.json')
    .then(response => {
      dispatch(fetchReviewCardsSuccess(response.data));
    })
    .catch(err => {
      dispatch(fetchReviewCardsFail(err.response.data));      
    })
  };
}
