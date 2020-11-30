import { connect } from 'react-redux'
import style from './cart.module.css'
import formatMoney from '../../utils/formatMoney'
import { closeCart } from '../../redux/actions/cartActions'
import { incrementItem, decrementItem } from '../../redux/actions/main'

function Cart({dispatch, state, cartReducer}) {

    const handleCloseCart = () => {
        dispatch(closeCart())
    }

    const handleIncrementItem = (item) => {
        dispatch(incrementItem(item))
    }

    const handleDecrementItem = (item) => {
        dispatch(decrementItem(item))
    }

    return (
        cartReducer.openCart && (
        <div className={style.cartContainer}>
            <h1>JOGOS</h1>
            {
                <div className={style.cartItems}>
                    {
                        state.items.map((item) => (
                            <div>
                                <p>{item.jg_nome}</p>
                                <p>Quantidade: {item.quantidade}</p>
                                <p>Preço: {formatMoney(item.jg_preco)}</p>
                                <button onClick={() => handleIncrementItem(item)}>+</button>
                                <button disabled={item.quantidade < 2} onClick={() => handleDecrementItem(item)}>-</button>
                            </div>
                        ))
                    }

                    <p>Preço Total: {formatMoney(state.totalPrice)}</p>
                    <button onClick={handleCloseCart}>Recolher</button>
                </div>
            }
        </div>
        )
    )
}

export default connect(
    state => state
)(Cart)