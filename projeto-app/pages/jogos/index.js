import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/header'
import JogoApiRequest from '../src/core/JogoApiRequest'
import styles from './home.module.css'

export default function Jogos({ jogos }) {
    return (
        <>
        <Head>
            <title>Jogos</title>
        </Head>
        <Header />
        <div className={styles.container}>
            <p className={styles.title}>Jogos disponíveis ({jogos.length})</p>
            <ul className={styles.games}>
                {
                    jogos.map((jogo) => (
                        <li className={styles.games_listagem} key={jogo.id}>
                            <div className={`${styles.game}`}>
                                <img
                                    src={"http://localhost:1337" + jogo.jg_imagem[0].formats.thumbnail.url}
                                />
                                <div className={styles.game_name}>
                                    <Link href={`/jogos/${jogo.id}`}>
                                        <a><p>{jogo.jg_nome}</p></a>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
        </>
    )
}


export async function getServerSideProps() {
    const response = await JogoApiRequest.obterJogos()

    return {
        props: {
            jogos: response.data
        }
    }
}
