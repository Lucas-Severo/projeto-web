import Head from 'next/head'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header'
import Stars from '../../components/stars/Stars'
import Warning from '../../components/warnings/warning'
import { addItem } from '../../redux/actions/main'
import { addAvaliacao, setAvaliacoes, nextPage, previousPage, resetaPage } from '../../redux/actions/avaliacoesActions'
import IsLogged from '../../utils/isLogged'
import AvaliacaoApiRequest from '../src/core/AvaliacaoApiRequest'
import JogoApiRequest from '../src/core/JogoApiRequest'
import humanizarCategorias from '../../utils/humanizarCategorias'
import style from './jogo.module.css'

function Jogo({jogo, avaliacoes, dispatch, avaliacaoReducer}) {

    const [nextButtonDisabled, setNextButtonDisabled] = useState(false)
    const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true)
    const [avaliacao, setAvaliacao] = useState('')
    const [nota, setNota] = useState(0)
    const [stars, setStars] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [warnings, setWarnings] = useState('')

    useEffect(() => {
        dispatch(resetaPage())
        dispatch(setAvaliacoes(avaliacoes))

        verificarBotoes()

        setIsLoggedIn(IsLogged())
    }, [])

    useEffect(() => {
        setStars(avaliacaoReducer.notaMedia)
    }, [avaliacaoReducer.notaMedia])

    const avancarPagina = () => {
        dispatch(nextPage({page: avaliacaoReducer.pagination.page + 1}))

        verificarBotoes()
    }

    const retornarPagina = () => {
        dispatch(previousPage({page: avaliacaoReducer.pagination.page - 1}))

        verificarBotoes()
    }

    const verificarBotoes = () => {
        if (avaliacaoReducer.pagination.page === 1) {
            setPreviousButtonDisabled(true)
        } else {
            setPreviousButtonDisabled(false)
        }

        if (avaliacaoReducer.pagination.page >= avaliacaoReducer.pagination.totalPages) {
            setNextButtonDisabled(true)
        } else {
            setNextButtonDisabled(false)
        }
    }

    const handleSaveComment = async () => {
        if (!checkWarnings()) {    
            const requestBody = {
                av_comentario: avaliacao,
                jg_id: jogo.id,
                nota: nota
            }
            const {data} = await AvaliacaoApiRequest.salvar(requestBody)
            dispatch(addAvaliacao(data))
            verificarBotoes()
            limparCampos()
        }
    }

    const checkWarnings = () => {
        let hasWarnings = false

        if (nota < 1 || nota > 5) {
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
        setNota(0)
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
                        <div className={style.jogoNota}>
                            <Stars key={"jogo__"+jogo.id} 
                                uid={jogo.id}
                                nota={stars}/>
                        </div>
                    </div>
                    <p>Nome: {jogo.jg_nome}</p>
                    <p>Descrição: {jogo.jg_descricao}</p>
                    <p>Categoria: {humanizarCategorias(jogo.jg_categoria)}</p>
                    <p>Desenvolvedora: {jogo.jg_desenvolvedora}</p>
                    <p>Preço: R$ {jogo.jg_preco}</p>
                    {isLoggedIn &&
                        <button onClick={adicionarItemCarrinho}>Adicionar ao carrinho</button>
                    }
                </div>

                <h1 className={style.comentarios__title}>Comentários ({avaliacaoReducer.avaliacoes.length})</h1>
                
                {
                    isLoggedIn && <div className={style.comentarioSession}>
                        <textarea 
                            name='comentario' 
                            value={avaliacao} 
                            onChange={(event) => setAvaliacao(event.target.value)}
                            rows='5'
                            className={style.txtArea}/>
                        <p>Nota: 
                            <input
                                name='nota'
                                min='1' 
                                max='5' 
                                step='0.5'
                                value={nota}
                                onChange={(event) => setNota(event.target.value)}
                                type='number'/>
                            </p>
                        <button onClick={handleSaveComment}>Enviar comentário</button>
                        <Warning message={warnings}/>
                    </div>
                }
                <ul className={style.comentarios}>
                {
                    avaliacaoReducer.avaliacao_paginate.map(avaliacao => (
                        <li className={style.comentario} key={avaliacao.id}>
                            <div>
                            <p className={style.comentario__user_name}>Usuário: {avaliacao.us_id.username}</p>
                            <p className={style.texto}>{avaliacao.av_comentario}</p>
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
                        disabled={previousButtonDisabled}
                        onClick={retornarPagina}>Anterior</button>
                    <button 
                        disabled={nextButtonDisabled}
                        onClick={avancarPagina}>Próximo</button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({query}) {
    const response = await JogoApiRequest.obterJogo(query.id)

    const avaliacoes = []

    for(let avaliacao of response.data.avaliacoes) {
        const {data} = await AvaliacaoApiRequest.buscarPorId(avaliacao.id)
        avaliacoes.push(data)
    }

    return {
        props: {
           jogo: response.data,
           avaliacoes: avaliacoes
        }
    }
}

export default connect(
    state=>state
)(Jogo)