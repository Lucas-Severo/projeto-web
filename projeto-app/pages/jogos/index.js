import axios from 'axios'
import Link from 'next/link'
import styles from './home.module.css'
import JogoApiRequest from '../src/core/JogoApiRequest'
import Header from '../../components/header'
import Head from 'next/head'

export default function Jogos({jogos}) {
    return (
        <>
            <Head>
                <title>Jogos</title>
            </Head>
            <Header/>
            <p>Jogos disponíveis</p>
            <ul className={styles.games}>
                {
                    jogos.map((jogo, index) => (
                        <li className={styles.games_listagem} key={jogo.id}>
                            <div className={`${styles.game}`}>
                                <img 
                                    src={"http://localhost:1337"+jogo.jg_imagem[0].formats.thumbnail.url}  
                                />
                                <div className={styles.game_name}>
                                    <Link href={`/jogos/${jogo.id}`}>
                                        <a>{jogo.jg_nome}</a>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}


export async function getServerSideProps() {
    const response = await JogoApiRequest.obterJogos()
    return {
        props: {
           jogos: response.data
        }
    }
}