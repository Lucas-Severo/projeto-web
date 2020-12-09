import { connect } from 'react-redux'
import style from './cart.module.css'
import formatMoney from '../../utils/formatMoney'
import { closeCart } from '../../redux/actions/cartActions'
import { incrementItem, decrementItem, removeItem, limparCarrinho } from '../../redux/actions/main'
import { setVendas } from '../../redux/actions/vendaActions'
import DoubleArrow from '@material-ui/icons/DoubleArrow'
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn'
import Tooltip from '../tooltip/Tooltip'
import ModalConfirmacao from '../modalConfirmacao/ModalConfirmacao'
import VendaApiRequest from '../../pages/src/core/VendaApiRequest'
import ItemVendaApiRequest from '../../pages/src/core/ItemVendaApiRequest'
import { useState } from 'react'

function Cart({dispatch, state, cartReducer, vendaReducer}) {

    const [showModal, setShowModal] = useState(false)

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

    const finalizarVenda = async() => {
        const totalVenda = state.totalPrice
        const {data} = await VendaApiRequest.realizarVenda(totalVenda)
        await ItemVendaApiRequest.cadastrarItensVenda(state.items, data)
        dispatch(limparCarrinho())

        const {data: vendas} = await VendaApiRequest.buscarVendasPorUsuario(vendaReducer.pagination.start, vendaReducer.pagination.limit)
        const {data: totalVendas} = await VendaApiRequest.countVendasPorUsuario()
        dispatch(setVendas(vendas, totalVendas))
        
        fecharModal()
    }

    const abrirModal = () => {
        setShowModal(true)
    }

    const fecharModal = () => {
        setShowModal(false)
    }

    return (
        <>
        {
            showModal && <div className={style.absolute}>
                <ModalConfirmacao 
                    message={"Deseja mesmo concluir a venda?"} 
                    showModal={showModal}
                    close_listener={fecharModal}
                    agree_listener={finalizarVenda}/>
            </div>
        }
        {
        cartReducer.openCart && (
        <div className={style.cartContainer}>
            <h1 className={style.cartTitle}>Carrinho ({state.items.length})</h1>
            {
                <div className={style.cartItems}>
                    {
                        state.items.map((item) => (
                            <div className={style.cartItem} key={"cart_item_"+item.id}>
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
                        <div className={style.priceContainer}>
                            Preço Total: {formatMoney(state.totalPrice)}
                            {
                                state.items.length > 0 && <Tooltip 
                                    message={"Finalizar Venda"}
                                    icon={
                                        <AssignmentTurnedIn 
                                            onClick={abrirModal}
                                            className={style.finalizarVenda}/>
                                    }/>
                            }
                        </div>
                        <button onClick={handleCloseCart}>
                            <DoubleArrow/>
                        </button>
                    </div>
                </div>
            }
        </div>
        )}
        </>
    )
}

export default connect(
    state => state
)(Cart)