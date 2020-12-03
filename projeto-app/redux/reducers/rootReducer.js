import main from './main'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import avaliacaoReducer from './avaliacaoReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    state: main,
    userReducer: userReducer,
    cartReducer: cartReducer,
    avaliacaoReducer: avaliacaoReducer
})

export default rootReducer