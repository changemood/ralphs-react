// Auth actions
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

// User actions
export const STORE_USER = 'STORE_USER';
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

// Review Cards
export const REVIEW_CARD = 'REVIEW_CARD';
export const FETCH_REVIEW_CARDS_START = 'FETCH_REVIEW_CARDS_START';
export const FETCH_REVIEW_CARDS_SUCCESS = 'FETCH_REVIEW_CARDS_SUCCESS';
export const FETCH_REVIEW_CARDS_FAIL = 'FETCH_REVIEW_CARDS_FAIL';

// Cards Tree
export const FETCH_CARDS_TREE_START = 'FETCH_CARDS_TREE_START';
export const FETCH_CARDS_TREE_SUCCESS = 'FETCH_CARDS_TREE_SUCCESS';
export const FETCH_CARDS_TREE_FAIL = 'FETCH_CARDS_TREE_FAIL';
export const UPDATE_CARDS_TREE_STATE = 'UPDATE_CARDS_TREE_STATE';
export const UPDATE_CARD_PARENT = 'UPDATE_CARD_PARENT';

// Create/Edit/delete Card
export const MANAGE_CARD_START = 'MANAGE_CARD_START';
export const MANAGE_CARD_SUCCESS = 'MANAGE_CARD_SUCCESS';
export const MANAGE_CARD_FAIL = 'MANAGE_CARD_FAIL';

//// Boards in boards.rb
export const FETCH_BOARDS_START = 'FETCH_BOARDS_START';
export const FETCH_BOARDS_SUCCESS = 'FETCH_BOARDS_SUCCESS';
export const FETCH_BOARDS_FAIL = 'FETCH_BOARDS_FAIL';
// Create/Edit/delete Board
export const MANAGE_BOARD_START = 'MANAGE_BOARD_START';
export const MANAGE_BOARD_SUCCESS = 'MANAGE_BOARD_SUCCESS';
export const MANAGE_BOARD_FAIL = 'MANAGE_BOARD_FAIL';
// set board when users clikced link on boards list
export const SET_BOARD = 'SET_BOARD';
// get board when users go board page not from /boards
export const FETCH_BOARD_START = 'FETCH_BOARD_START';
export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS';
export const FETCH_BOARD_FAIL = 'FETCH_BOARD_FAIL';