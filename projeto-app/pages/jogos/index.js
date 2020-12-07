import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header'
import JogoApiRequest from '../src/core/JogoApiRequest'
import {setJogos, nextPageJogos, previousPageJogos} from '../../redux/actions/jogosActions'
import styles from './home.module.css'
import Stars from '../../components/stars/Stars'

function Jogos({dispatch, jogoReducer}) {

    useEffect(async() => {
        const {data} = await JogoApiRequest.obterJogos(
            jogoReducer.pagination.start, 
            jogoReducer.pagination.limit)

        const countJogos = await JogoApiRequest.countJogos()

        dispatch(setJogos(data, countJogos.data))
    }, [jogoReducer.pagination.start])

    const retornarPagina = () => {
        dispatch(previousPageJogos())
    }

    const avancarPagina = () => {
        dispatch(nextPageJogos())
    }

    return (
        <>
        <Head>
            <title>Jogos</title>
        </Head>
        <Header />
        <div className={styles.container}>
            <p className={styles.title}>Jogos disponíveis ({jogoReducer.totalJogos})</p>
            <ul className={styles.games}>
                {
                    jogoReducer.jogos.map((jogo) => (
                        <li className={styles.games_listagem} key={jogo.id}>
                            <div className={`${styles.game}`}>
                                <img
                                    src={"http://localhost:1337" + jogo.jg_imagem[0].formats.thumbnail.url}
                                />
                                <div className={styles.game_name}>
                                    <Link href={`/jogos/${jogo.slug}`}>
                                        <a><p>{jogo.jg_nome}</p></a>
                                    </Link>
                                </div>
                                <div className={styles.jogoNota}>
                                    <Stars 
                                        uid={jogo.id}
                                        nota={(jogo.jg_media || 0)}/>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.jogos_actions}>
                <button 
                    disabled={jogoReducer.previousButtonDisabled}
                    onClick={retornarPagina}
                >
                        Anterior
                </button>
                <button 
                    disabled={jogoReducer.nextButtonDisabled}
                    onClick={avancarPagina}
                >
                        Próximo
                </button>
            </div>
        </div>
        </>
    )
}


export default 
connect(
    state=>state
)(Jogos);
