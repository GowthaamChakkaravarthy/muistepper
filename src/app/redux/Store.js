import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './reducers/RootReducer';

const initialState = {};
const middlewares = [thunk];
let devtools = (x) => x;


export const Store = createStore(
	RootReducer,
	initialState,
	compose(applyMiddleware(...middlewares), devtools)
);