import main from './main'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import avaliacaoReducer from './avaliacaoReducer'
import jogoReducer from './jogoReducer'
import vendaReducer from './vendaReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    state: main,
    userReducer: userReducer,
    cartReducer: cartReducer,
    avaliacaoReducer: avaliacaoReducer,
    vendaReducer: vendaReducer,
    jogoReducer: jogoReducer
})

export default rootReducer