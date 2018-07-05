import axios from '../../utilities';

import * as actionTypes from './actionTypes';

export const fetchCardsTreetart = () => {
  return {
    type: actionTypes.FETCH_CARDS_TREE_START,
  };
};

export const fetchCardsTreeuccess = (cardsTree) => {
  return {
    type: actionTypes.FETCH_CARDS_TREE_SUCCESS,
    cardsTree: cardsTree
  };
};

export const fetchCardsTreeFail = (error) => {
  return {
    type: actionTypes.FETCH_CARDS_TREE_FAIL,
    error: error
  };
};

export const fetchCardsTree = (id) => {
  id = "8984903c-709b-4a6d-8d4a-0286247ad324"
  return dispatch => {
    dispatch(fetchCardsTreetart());
    axios.get(`/v1/boards/${id}/cards/tree.json`)
    .then(response => {
      dispatch(fetchCardsTreeuccess(response.data));
    })
    .catch(err => {
      dispatch(fetchCardsTreeFail(err.response.data));      
    })
  };
}

export const updateCardsTreeState = (cardsTree) => {
  return {
    type: actionTypes.UPDATE_CARDS_TREE_STATE,
    cardsTree: cardsTree
  };
};
