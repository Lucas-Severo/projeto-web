import {ADD_AVALIACAO, SET_AVALIACOES, NEXT_PAGE, PREVIOUS_PAGE, RESETA_PAGE} from '../actions/actionTypes'

const initialState = {
    avaliacoes: [],
    avaliacao_paginate: [],
    pagination: {
        start: 0,
        end: 8,
        total: 0,
        totalPages: 0,
        page: 1
    },
    notaMedia: 0
}

let avaliacoes = []

const avalicaoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_AVALIACAO:
            state.notaMedia = 0
            state.avaliacoes.push(action.payload)

            state.pagination.total = state.avaliacoes.length
            state.pagination.totalPages = Math.ceil(state.pagination.total / state.pagination.end)

            avaliacoes = []
            for (let [index, comentario] of state.avaliacoes.entries()) {
                if (index >= state.pagination.start && index < (state.pagination.start + state.pagination.end)) {
                    state.notaMedia += comentario.nota
                    avaliacoes.push(comentario)
                }
            }

            state.avaliacao_paginate = avaliacoes
            
            state.notaMedia = state.avaliacoes
                .map(comentario => comentario.nota)
                .reduce((accumulator, currVal) => accumulator + currVal)
            
            state.notaMedia = (state.notaMedia / state.pagination.total).toFixed(2)
            return {...state}
        case SET_AVALIACOES:
            state.notaMedia = 0
            avaliacoes = []
            for (let [index, comentario] of action.payload.entries()) {
                if (index >= state.pagination.start && index < (state.pagination.start + state.pagination.end)) {
                    avaliacoes.push(comentario)
                } else {
                    break
                }
            }
            
            state.pagination.total = action.payload.length
            state.pagination.totalPages = Math.ceil(state.pagination.total / state.pagination.end)

            state.avaliacoes = action.payload
            state.avaliacao_paginate = avaliacoes

            state.notaMedia = state.avaliacoes
                .map(comentario => comentario.nota)
                .reduce((accumulator, currVal) => accumulator + currVal)
            
            state.notaMedia = (state.notaMedia / state.pagination.total).toFixed(2)
            return {...state}
        case NEXT_PAGE:
            state.pagination.page += 1
            state.pagination.start += state.pagination.end

            avaliacoes = []
            for (let [index, comentario] of state.avaliacoes.entries()) {
                if (index >= state.pagination.start && index < (state.pagination.start + state.pagination.end)) {
                    avaliacoes.push(comentario)
                }
            }

            state.avaliacao_paginate = avaliacoes

            return {...state}
        case PREVIOUS_PAGE:
            state.pagination.page -= 1
            state.pagination.start -= state.pagination.end

            avaliacoes = []
            for (let [index, comentario] of state.avaliacoes.entries()) {
                if (index >= state.pagination.start && index < (state.pagination.start + state.pagination.end)) {
                    avaliacoes.push(comentario)
                }
            }

            state.avaliacao_paginate = avaliacoes

            return {...state}
        case RESETA_PAGE:
            state.pagination.page = 1
            state.pagination.start = 0

            return {...state}
        default:
            return {...state}
    }
}

export default avalicaoReducer