import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import reviewCardsReducer from './store/reducers/reviewCards';
import cardsTreeReducer from './store/reducers/cardsTree';
import manageCardReducer from './store/reducers/manageCard';
import boardsReducer from './store/reducers/boards'

// Redux devtool extention for development
const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  reviewCards: reviewCardsReducer,
  cardsTree: cardsTreeReducer,
  manageCard: manageCardReducer,
  boards: boardsReducer,
});

// To keep state with browser refresh. For now, we keep only user state.
const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['user']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
));
const persistor = persistStore(store)

const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
