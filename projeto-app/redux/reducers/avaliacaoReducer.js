import {ADD_AVALIACAO, SET_AVALIACOES, NEXT_PAGE, PREVIOUS_PAGE} from '../actions/actionTypes'

const initialState = {
    avaliacoes: [],
    avaliacao_paginate: [],
    pagination: {
        start: 0,
        end: 8,
        total: 0,
        totalPages: 0,
        page: 1
    }
}

let avaliacoes = []

const avalicaoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_AVALIACAO:
            state.avaliacoes.push(action.payload)

            state.pagination.total = state.avaliacoes.length
            state.pagination.totalPages = Math.ceil(state.pagination.total / state.pagination.end)

            avaliacoes = []
            for (let [index, comentario] of state.avaliacoes.entries()) {
                if (index >= state.pagination.start && index < (state.pagination.start + state.pagination.end)) {
                    avaliacoes.push(comentario)
                }
            }

            state.avaliacao_paginate = avaliacoes

            return {...state}
        case SET_AVALIACOES:
            avaliacoes = []
            for (let [index, comentario] of action.payload.entries()) {
                if (index >= state.pagination.start && index < (state.pagination.start + state.pagination.end)) {
                    avaliacoes.push(comentario)
                }
            }

            state.pagination.total = action.payload.length
            state.pagination.totalPages = Math.ceil(state.pagination.total / state.pagination.end)

            state.avaliacoes = action.payload
            state.avaliacao_paginate = avaliacoes
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
        default:
            return {...state}
    }
}

export default avalicaoReducer