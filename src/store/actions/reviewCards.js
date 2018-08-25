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
    axios.get('/v1/cards/review_cards.json')
    .then(response => {
      dispatch(fetchReviewCardsSuccess(response.data));
    })
    .catch(err => {
      dispatch(fetchReviewCardsFail(err.response.data));      
    })
  };
}

// type can be either up or down
export const reviewCard = (id, type) => {
  return dispatch => {
    axios.post(`/v1/cards/${id}/${type}.json`)
    .then(response => {
      dispatch({type: actionTypes.REVIEW_CARD, reviewedCard: response.data});
    })
  };
}