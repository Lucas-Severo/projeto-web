import { ADD_AVALIACAO, NEXT_PAGE, PREVIOUS_PAGE, SET_AVALIACOES } from './actionTypes'

export const addAvaliacao = (item) => ({
    type: ADD_AVALIACAO,
    payload: item
})

export const setAvaliacoes = (item) => ({
    type: SET_AVALIACOES,
    payload: item
})

export const nextPage = () => ({
    type: NEXT_PAGE
})

export const previousPage = () => ({
    type: PREVIOUS_PAGE
})
