import { CLOSE_CART, OPEN_CART } from './actionTypes'

export const openCart = () => ({
    type: OPEN_CART
})

export const closeCart = () => ({
    type: CLOSE_CART
})
