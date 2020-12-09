import { ADD_ITEM, DECREMENT_ITEM, GET_ITEMS, INCREMENT_ITEM, REMOVE_ITEM, LIMPAR_CARRINHO } from './actionTypes'

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
})

export const removeItem = (item) => ({
    type: REMOVE_ITEM,
    payload: item
})

export const getItems = () => ({
    type: GET_ITEMS
})

export const incrementItem = (item) => ({
    type: INCREMENT_ITEM,
    payload: item
})

export const decrementItem = (item) => ({
    type: DECREMENT_ITEM,
    payload: item
})

export const limparCarrinho = () => ({
    type: LIMPAR_CARRINHO
})