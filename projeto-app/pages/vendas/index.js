import {setVendas, nextPageVendas, previousPageVendas} from '../../redux/actions/vendaActions'
import VendaApiRequest from '../src/core/VendaApiRequest'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import formatMoney from '../../utils/formatMoney'
import style from './vendas.module.css'
import Head from 'next/head'
import Header from '../../components/header'

function Vendas({dispatch, vendaReducer}) {

    useEffect(async() => {
        const vendas = await buscarVendas()
        const {data: totalVendas} = await VendaApiRequest.countVendasPorUsuario()
        dispatch(setVendas(vendas, totalVendas))
    }, [vendaReducer.pagination.page])

    const buscarVendas = async () => {
        const {data} = await VendaApiRequest.buscarVendasPorUsuario(vendaReducer.pagination.start, vendaReducer.pagination.limit)
        return data
    }

    const converterData = (data) => {
        const date = new Date(data)
        return date.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          });
    }

    const retornarPagina = () => {
        dispatch(previousPageVendas())
    }

    const avancarPagina = () => {
        dispatch(nextPageVendas())
    }

    return (
        <div>
            <Head>
                <title>Compras</title>
            </Head>
            <Header/>
            <div className={style.countVendas}>
                <p>Quantidade de compras: {vendaReducer.totalVendas}</p>
            </div>
            <div className={style.vendasContainer}>
                <table>
                    <thead className={style.tableHeader}>
                        <tr className={style.headerRow}>
                            <th>Id</th>
                            <th>Quantidade</th>
                            <th>Preço Total</th>
                            <th>Data Compra</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={style.tableBody}>
                    {
                        vendaReducer.vendas.length > 0 ? 
                        (vendaReducer.vendas.map(venda => (
                            <tr>
                                <td>{venda.id}</td>
                                <td>{venda.itens.length}</td>
                                <td>{formatMoney(venda.ve_preco_total)}</td>
                                <td>{converterData(venda.published_at)}</td>
                                <td>Acessar</td>
                            </tr>
                        ))) : 
                        (
                            <tr>
                                <td className={style.noData} colSpan="100%">
                                    Nenhuma compra realizada
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className={style.vendas_pagination}>
                <button 
                    disabled={vendaReducer.previousButtonDisabled}
                    onClick={retornarPagina}
                >
                        Anterior
                </button>
                <button 
                    disabled={vendaReducer.nextButtonDisabled}
                    onClick={avancarPagina}
                >
                        Próximo
                </button>
            </div>
        </div>
    );
}

export default connect(
    state => state
)
(Vendas)