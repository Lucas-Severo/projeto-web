import { NEXT_PAGE_VENDAS, PREVIOUS_PAGE_VENDAS, SET_VENDAS } from '../actions/actionTypes'

const initialState = {
    vendas: [],
    totalVendas: 0,
    pagination: {
        start: 0,
        limit: 12,
        page: 1,
        totalPages: 1,
        itemsPerPage: 12
    },
    nextButtonDisabled: true,
    previousButtonDisabled: true
}

const vendaReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_VENDAS:
            state.vendas = action.payload.vendas
            state.totalVendas = action.payload.totalVendas
            state.pagination.totalPages = Math.ceil(state.totalVendas / state.pagination.itemsPerPage)
            state.previousButtonDisabled = previousButtonDisabled(state.pagination)
            state.nextButtonDisabled = nextButtonDisabled(state.pagination)
            return {...state}

        case NEXT_PAGE_VENDAS:
            state.pagination.page += 1
            state.pagination.start += state.pagination.itemsPerPage
            state.previousButtonDisabled = previousButtonDisabled(state.pagination)
            state.nextButtonDisabled = nextButtonDisabled(state.pagination)

            return {...state}

        case PREVIOUS_PAGE_VENDAS:
            state.pagination.page -= 1
            state.pagination.start -= state.pagination.itemsPerPage
            state.previousButtonDisabled = previousButtonDisabled(state.pagination)
            state.nextButtonDisabled = nextButtonDisabled(state.pagination)

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

export default vendaReducer