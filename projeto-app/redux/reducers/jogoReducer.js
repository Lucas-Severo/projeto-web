import 
{
    ADD_JOGO, 
    SET_JOGO,
    SET_JOGOS, 
    NEXT_PAGE_JOGOS, 
    PREVIOUS_PAGE_JOGOS
} from '../actions/actionTypes'


const initialState = {
    jogos: [],
    jogo: {},
    totalJogos: 0,
    pagination: {
        start: 0,
        limit: 9,
        page: 1,
        totalPages: 1,
        itemsPerPage: 9
    },
    nextButtonDisabled: true,
    previousButtonDisabled: true
}

const jogoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_JOGO:
            state.jogos.push(action.payload)
            return {...state}
        case SET_JOGO:
            state.jogo = action.payload
            return {...state}
        case SET_JOGOS:
            state.jogos = action.payload.jogos
            state.totalJogos = action.payload.totalJogos
            state.pagination.totalPages = Math.ceil(state.totalJogos / state.pagination.itemsPerPage)
            state.previousButtonDisabled = previousButtonDisabled(state.pagination)
            state.nextButtonDisabled = nextButtonDisabled(state.pagination)
            
            return {...state}
        case NEXT_PAGE_JOGOS:
            state.pagination.page += 1
            state.pagination.start += state.pagination.itemsPerPage
            state.previousButtonDisabled = previousButtonDisabled(state.pagination)
            state.nextButtonDisabled = nextButtonDisabled(state.pagination)

            return {...state}
        case PREVIOUS_PAGE_JOGOS:
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

export default jogoReducer