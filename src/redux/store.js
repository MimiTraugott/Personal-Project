import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer';
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
    user: reducer,
    cart: cartReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers(
applyMiddleware(promiseMiddleware)));

