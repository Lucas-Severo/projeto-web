import { connect } from 'react-redux'
import style from './cart.module.css'
import formatMoney from '../../utils/formatMoney'
import { closeCart } from '../../redux/actions/cartActions'
import { incrementItem, decrementItem, removeItem } from '../../redux/actions/main'
import DoubleArrow from '@material-ui/icons/DoubleArrow'

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

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item))
    }

    return (
        cartReducer.openCart && (
        <div className={style.cartContainer}>
            <h1 className={style.cartTitle}>Carrinho ({state.items.length})</h1>
            {
                <div className={style.cartItems}>
                    {
                        state.items.map((item) => (
                            <div className={style.cartItem}>
                                <p className={style.cartItemGameName}>{item.jg_nome}</p>
                                <p>Quantidade: {item.quantidade}</p>
                                <p>Preço: {formatMoney(item.jg_preco)}</p>
                                <button className={style.cartItemActions} onClick={() => handleIncrementItem(item)}>+</button>
                                <button className={style.cartItemActions} disabled={item.quantidade < 2} onClick={() => handleDecrementItem(item)}>-</button>
                                <button className={style.cartItemRemove} onClick={() => handleRemoveItem(item)}>x</button>
                            </div>
                        ))
                    }

                    <div className={style.cartBottom}>
                        <p>Preço Total: {formatMoney(state.totalPrice)}</p>
                        <button onClick={handleCloseCart}>
                            <DoubleArrow/>
                        </button>
                    </div>
                </div>
            }
        </div>
        )
    )
}

export default connect(
    state => state
)(Cart)