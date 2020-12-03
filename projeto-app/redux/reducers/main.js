import { ADD_ITEM, DECREMENT_ITEM, GET_ITEMS, INCREMENT_ITEM, REMOVE_ITEM } from '../actions/actionTypes'

const initialState = {
    items: [],
    totalPrice: 0
}

const main = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ITEM:
            const {id, jg_preco, jg_nome, jg_imagem} = action.payload
            let item_existente = false

            for(let item of state.items) {
                if (item.id === id) {
                    item.quantidade++
                    item_existente = true
                    break
                }
            }

            if (!item_existente) {
                const item = {
                    id,
                    jg_preco,
                    jg_nome,
                    jg_imagem,
                    quantidade: 1
                }
                state.items.push(item)
            }
            state.totalPrice = calcularValorTotal(state)
            return {...state}
        case REMOVE_ITEM:
            state.items = state.items.filter(item => item.id !== action.payload.id)
            state.totalPrice = calcularValorTotal(state)
            return {...state}
        case GET_ITEMS:
            return {...state}

        case INCREMENT_ITEM:
            state.items = state.items.map(item => {
                if (item.id !== action.payload.id) {
                    return item
                } else {
                    return {...item, quantidade: item.quantidade + 1}
                }
            })
            state.totalPrice = calcularValorTotal(state)
            return {...state}

        case DECREMENT_ITEM:
            state.items = state.items.map(item => {
                if (item.id !== action.payload.id) {
                    return item
                } else {
                    return {...item, quantidade: item.quantidade - 1}
                }
            })
            state.totalPrice = calcularValorTotal(state)
            return {...state}
        default:
            return {...state}
    }
}

function calcularValorTotal(state) {
    let total = 0

    for (let item of state.items) {
        total += (item.jg_preco * item.quantidade)
    }

    return total
}

export default main