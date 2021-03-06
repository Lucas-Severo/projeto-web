import {ADD_AVALIACAO, SET_AVALIACOES, NEXT_PAGE, PREVIOUS_PAGE, RESETA_PAGE, SET_NOTA} from '../actions/actionTypes'

const initialState = {
    avaliacoes: [],
    pagination: {
        start: 0,
        limit: 8,
        totalPages: 1,
        totalItems: 0,
        page: 1,
        itemsPerPage: 8
    },
    previousButtonDisabled: true,
    nextButtonDisabled: true,
    nota: 0,
    notaMedia: 0
}

const avalicaoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_AVALIACAO:
            state.pagination.totalItems += 1

            state.notaMedia = 0
            return {...state}
        case SET_AVALIACOES:
            state.notaMedia = 0
            state.avaliacoes = action.payload.item
            state.pagination.totalItems = action.payload.totalItems

            state.pagination.totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage)

            state.previousButtonDisabled = previousButtonDisabled(state.pagination)
            state.nextButtonDisabled = nextButtonDisabled(state.pagination)

            state.notaMedia = 0
            return {...state}
        case NEXT_PAGE:
            state.pagination.page += 1
            state.pagination.start += state.pagination.itemsPerPage

            state.previousButtonDisabled = previousButtonDisabled(state.pagination)
            state.nextButtonDisabled = nextButtonDisabled(state.pagination)

            return {...state}
        case PREVIOUS_PAGE:
            state.pagination.page -= 1
            state.pagination.start -= state.pagination.itemsPerPage

            state.previousButtonDisabled = previousButtonDisabled(state.pagination)
            state.nextButtonDisabled = nextButtonDisabled(state.pagination)

            return {...state}
        case RESETA_PAGE:
            state.pagination.page = 1
            state.pagination.start = 0

            return {...state}

        case SET_NOTA:
            state.nota = action.payload

            return {...state}
        default:
            return {...state}
    }
}

function previousButtonDisabled(pagination) {
    return pagination.page === 1
}

function nextButtonDisabled(pagination) {
    return pagination.page >= pagination.totalPages
}

export default avalicaoReducer