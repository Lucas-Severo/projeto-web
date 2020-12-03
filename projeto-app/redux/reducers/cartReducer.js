import { CLOSE_CART, OPEN_CART } from '../actions/actionTypes'

const initialState = {
    openCart: false
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case OPEN_CART:
            state.openCart = true
            return {...state}
        case CLOSE_CART:
            state.openCart = false
            return {...state}
        default:
            return {...state}
    }
}

export default cartReducer