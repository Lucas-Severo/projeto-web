import 
{
    ADD_JOGO, 
    SET_JOGOS, 
    NEXT_PAGE_JOGOS, 
    PREVIOUS_PAGE_JOGOS
} from './actionTypes'

export const addJogo = (jogo) => ({
    type: ADD_JOGO,
    payload: jogo
})

export const setJogos = (jogos, totalJogos) => ({
    type: SET_JOGOS,
    payload: {
        jogos,
        totalJogos
    }
})

export const nextPageJogos = () => ({
    type: NEXT_PAGE_JOGOS
})

export const previousPageJogos = () => ({
    type: PREVIOUS_PAGE_JOGOS
})
