import { SET_VENDAS, NEXT_PAGE_VENDAS, PREVIOUS_PAGE_VENDAS } from './actionTypes'

export const setVendas = (vendas, totalVendas) => ({
    type: SET_VENDAS,
    payload: {
        vendas,
        totalVendas
    }
})

export const nextPageVendas = () => ({
    type: NEXT_PAGE_VENDAS
})

export const previousPageVendas = () => ({
    type: PREVIOUS_PAGE_VENDAS
})