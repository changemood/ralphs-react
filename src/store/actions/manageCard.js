import axios from '../../utilities';

import * as actionTypes from './actionTypes';

export const manageCardStart = () => {
  return {
    type: actionTypes.MANAGE_CARD_START,
  };
};

export const manageCardSuccess = (card, message) => {
  return {
    type: actionTypes.MANAGE_CARD_SUCCESS,
    card: card,
    message: message
  };
};

export const manageCardFail = (message) => {
  return {
    type: actionTypes.MANAGE_CARD_FAIL,
    message: message
  };
};

// This returns promise so that we can do something after save.
// e.g. close modal!! and adding the new card to tree!! etc...
export const createCard = (data={}) => (dispatch) => {
  return (new Promise((resolve, reject) => {
    dispatch(manageCardStart());
    axios.post('/v1/cards.json', data)
      .then(response => {
        dispatch(manageCardSuccess(response.data, "Card is successfully created"));
        resolve();
      })
      .catch(err => {
        dispatch(manageCardFail(err.response.data));      
        reject();
      })
  }))
}

export const editCard = () => {
  // return dispatch => {
  //   dispatch(MANAGECardStart());
    // axios.get('/v1/cards/review_cards.json')
    // .then(response => {
    //   dispatch(MANAGECardSuccess(response.data));
    // })
    // .catch(err => {
    //   dispatch(fetchReviewCardsFail(err.response.data));      
    // })
  // };
}

export const deleteCard = () => {
  // return dispatch => {
  //   dispatch(MANAGECardStart());
    // axios.get('/v1/cards/review_cards.json')
    // .then(response => {
    //   dispatch(MANAGECardSuccess(response.data));
    // })
    // .catch(err => {
    //   dispatch(fetchReviewCardsFail(err.response.data));      
    // })
  // };
}