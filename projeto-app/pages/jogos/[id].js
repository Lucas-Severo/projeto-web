import JogoApiRequest from '../src/core/JogoApiRequest'
import Header from '../../components/header'
import Head from 'next/head'

export default function Jogo({jogo}) {
    return (
        <div>
            <Head>
                <title>{jogo.jg_nome}</title>
            </Head>
            <Header/>
            Nome: {jogo.jg_nome}<br/>
            Descrição: {jogo.jg_descricao}
        </div>
    )
}

export async function getServerSideProps({query}) {
    const response = await JogoApiRequest.obterJogo(query.id)
    
    return {
        props: {
           jogo: response.data
        }
    }
}