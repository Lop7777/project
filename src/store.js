// store.js
import { createStore, combineReducers } from 'redux';
import ticketReducer from './ticketReducer';

const rootReducer = combineReducers({
  ticket: ticketReducer,
});

const store = createStore(rootReducer);

export default store;
