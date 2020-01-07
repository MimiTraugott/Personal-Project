import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer';
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
    user: reducer,
    cart: cartReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))