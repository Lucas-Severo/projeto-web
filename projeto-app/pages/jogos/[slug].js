import Head from 'next/head'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header'
import Stars from '../../components/stars/Stars'
import Warning from '../../components/warnings/warning'
import { addItem } from '../../redux/actions/main'
import { addAvaliacao, setAvaliacoes, nextPage, previousPage, resetaPage, setNota } from '../../redux/actions/avaliacoesActions'
import IsLogged from '../../utils/isLogged'
import AvaliacaoApiRequest from '../src/core/AvaliacaoApiRequest'
import JogoApiRequest from '../src/core/JogoApiRequest'
import humanizarCategorias from '../../utils/humanizarCategorias'
import style from './jogo.module.css'
import SelectNota from '../../components/selectNota/SelectNota'
import Tooltip from '../../components/tooltip/Tooltip'
import formatMoney from '../../utils/formatMoney'
import Add from '@material-ui/icons/Add'
import Send from '@material-ui/icons/Send'

function Jogo({jogo, dispatch, avaliacaoReducer}) {

    const [avaliacao, setAvaliacao] = useState('')
    const [stars, setStars] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [warnings, setWarnings] = useState('')

    useEffect(() => {
        dispatch(resetaPage())

        setIsLoggedIn(IsLogged())
    }, [])

    useEffect(async() => {
        const {data} = await AvaliacaoApiRequest.buscarTodos(
            jogo.id, 
            avaliacaoReducer.pagination.start, 
            avaliacaoReducer.pagination.limit)

        const {data: totalItems} = await AvaliacaoApiRequest.countAvaliacoes(jogo.id)
        dispatch(setAvaliacoes(data, totalItems))
    }, [avaliacaoReducer.pagination.start, avaliacaoReducer.pagination.totalItems])

    useEffect(() => {
        setStars(avaliacaoReducer.notaMedia)
    }, [avaliacaoReducer.notaMedia])

    const avancarPagina = () => {
        dispatch(nextPage())
    }

    const retornarPagina = () => {
        dispatch(previousPage())
    }

    const handleSaveComment = async () => {
        if (!checkWarnings()) {    
            const requestBody = {
                av_comentario: avaliacao,
                jg_id: jogo.id,
                nota: avaliacaoReducer.nota
            }
            const {data} = await AvaliacaoApiRequest.salvar(requestBody)
            dispatch(addAvaliacao(data))
            limparCampos()
        }
    }

    const checkWarnings = () => {
        let hasWarnings = false

        if (avaliacaoReducer.nota < 1 || avaliacaoReducer.nota > 5) {
            setWarnings('Nota deve estar entre 1 e 5')
            hasWarnings = true
        }

        if (!avaliacao) {
            setWarnings('Avaliação é obrigatória')
            hasWarnings = true
        }

        if (avaliacao && avaliacao.length < 3) {
            setWarnings('Avaliação deve possuir mais do que 3 caracteres')
            hasWarnings = true
        }

        if (avaliacao && avaliacao.length > 500) {
            setWarnings('Avaliação não pode possuir mais do que 500 caracteres')
            hasWarnings = true
        }

        setTimeout(function(){
            setWarnings('')
        }, 2500)

        return hasWarnings
    }

    const adicionarItemCarrinho = () => {
        dispatch(addItem(jogo))
    }

    const limparCampos = () => {
        setAvaliacao('')
        dispatch(setNota(0))
    }

    return (
        <div>
            <Head>
                <title>{jogo.jg_nome}</title>
            </Head>
            <Header/>
            <div className={style.container}>
                <div className={style.game_info}>
                    <div className={style.game__image}>
                        <img 
                            src={'http://localhost:1337'+jogo.jg_imagem[0].formats.thumbnail.url}  
                        />
                        <div className={style.game__stars}>
                            <div className={style.jogoNota}>
                                <Stars key={"jogo__"+jogo.id} 
                                    uid={jogo.id}
                                    nota={stars}/>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.infoContainer} ${style.tooltip}`}>
                        <p className={style.row}>Nome </p>
                        <p className={style.row}>{jogo.jg_nome}</p>
                        <p className={style.row}>Descrição</p>
                        <div className={style.row}>
                            <Tooltip message={jogo.jg_descricao}/>
                        </div>
                        <p className={style.row}>Categoria</p>
                        <p className={style.row}>{humanizarCategorias(jogo.jg_categoria)}</p>
                        <p className={style.row}>Desenvolvedora</p>
                        <p className={style.row}>{jogo.jg_desenvolvedora}</p>
                        <p className={style.row}>Preço</p>
                        <p className={style.row}>{formatMoney(jogo.jg_preco)}</p>
                    </div>
                    {isLoggedIn &&
                        <button 
                            className={style.buttonAddToCart} 
                            onClick={adicionarItemCarrinho}>
                                <p>Adicionar ao carrinho</p>
                                <Add/>
                        </button>
                    }
                </div>

                <h1 className={style.comentarios__title}>
                    Comentários ({avaliacaoReducer.pagination.totalItems})
                </h1>
                
                {
                    isLoggedIn && <div className={style.comentarioSession}>
                        <textarea 
                            name='comentario' 
                            value={avaliacao} 
                            onChange={(event) => setAvaliacao(event.target.value)}
                            rows='5'
                            className={style.txtArea}/>
                        <SelectNota/>
                        <button 
                            className={style.buttonSendComment}
                            onClick={handleSaveComment}>
                                <p>Enviar comentário</p>
                                <Send/>
                        </button>
                        <Warning message={warnings}/>
                    </div>
                }
                <ul className={style.comentarios}>
                {
                    avaliacaoReducer.avaliacoes.map(avaliacao => (
                        <li className={style.comentario} key={avaliacao.id}>
                            <div className={style.comentarioInfo}>
                                <p className={style.comentario__user_name}>Usuário: {avaliacao.us_id.username}</p>
                                <div className={style.tooltip}>
                                    <Tooltip message={avaliacao.av_comentario}/>
                                </div>
                            </div>
                            <div className={style.stars}>
                                <Stars uid={"avaliacao__"+avaliacao.id} nota={avaliacao.nota}/>
                            </div>
                        </li>
                    ))
                }
                </ul>

                <div className={style.comentario_actions}>
                    <button 
                        disabled={avaliacaoReducer.previousButtonDisabled}
                        onClick={retornarPagina}>Anterior</button>
                    <button 
                        disabled={avaliacaoReducer.nextButtonDisabled}
                        onClick={avancarPagina}>Próximo</button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({query}) {
    const {data} = await JogoApiRequest.obterJogo(query.slug)

    return {
        props: {
           jogo: data[0]
        }
    }
}

export default connect(
    state=>state
)(Jogo)
