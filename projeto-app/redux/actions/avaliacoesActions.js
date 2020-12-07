import { ADD_AVALIACAO, NEXT_PAGE, PREVIOUS_PAGE, SET_AVALIACOES, RESETA_PAGE, SET_NOTA } from './actionTypes'

export const addAvaliacao = (item) => ({
    type: ADD_AVALIACAO,
    payload: item
})

export const setAvaliacoes = (item, totalItems) => ({
    type: SET_AVALIACOES,
    payload: {
        item, 
        totalItems
    }
})

export const nextPage = () => ({
    type: NEXT_PAGE
})

export const previousPage = () => ({
    type: PREVIOUS_PAGE
})

export const resetaPage = () => ({
    type: RESETA_PAGE
})

export const setNota = (nota) => ({
    type: SET_NOTA,
    payload: nota
})