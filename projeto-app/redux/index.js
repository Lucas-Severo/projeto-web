import {createWrapper} from 'next-redux-wrapper'
import rootReducer from '../redux/reducers/rootReducer'
import {createStore} from 'redux'
import {applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

export const store = createStore(rootReducer, applyMiddleware(thunk))

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);