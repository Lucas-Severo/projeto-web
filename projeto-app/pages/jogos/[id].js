import JogoApiRequest from '../src/core/JogoApiRequest'
import AvaliacaoApiRequest from '../src/core/AvaliacaoApiRequest'
import Header from '../../components/header'
import Head from 'next/head'
import IsLogged from '../../utils/isLogged'
import style from './jogo.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const pagination = {
    start: 0,
    end: 5,
    total: 0,
    totalPages: 0,
    page: 1
}

export default function Jogo({jogo, avaliacoes}) {

    const router = useRouter()
    const [comentarios, setComentarios] = useState([]) 
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false)
    const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true)
    const [avaliacao, setAvaliacao] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        pagination.total = avaliacoes.length
        pagination.totalPages = Math.ceil(pagination.total / pagination.end)

        verificarBotoes()

        tratarEventoPaginar(0)
    
        setIsLoggedIn(IsLogged())
    }, [])

    const tratarEventoPaginar = (start) => {
        pagination.start = start
        const data = []

        for (let [index, comentario] of avaliacoes.entries()) {
            if (index >= pagination.start && index < (pagination.start + pagination.end)) {
                data.push(comentario)
            }
        }

        if (pagination.start + pagination.end < pagination.total) {

        }

        setComentarios(data)
    }

    const avancarPagina = () => {
        pagination.page = pagination.page + 1

        verificarBotoes()

        tratarEventoPaginar(pagination.start + pagination.end)
    }

    const retornarPagina = () => {
        pagination.page = pagination.page - 1

        verificarBotoes()

        tratarEventoPaginar(pagination.start - pagination.end)
    }

    const verificarBotoes = () => {
        if (pagination.page === 1) {
            setPreviousButtonDisabled(true)
        } else {
            setPreviousButtonDisabled(false)
        }

        if (pagination.page >= pagination.totalPages) {
            setNextButtonDisabled(true)
        } else {
            setNextButtonDisabled(false)
        }
    }

    const getUserImagem = (avaliacao) => {
        if(avaliacao.us_id.user_imagem) {
            return "http://localhost:1337"+avaliacao.us_id.user_imagem.formats.thumbnail.url
        }
    }

    const handleSaveComment = async () => {
        const requestBody = {
            av_comentario: avaliacao,
            jg_id: jogo.id
        }
        const {data} = await AvaliacaoApiRequest.salvar(requestBody)
        router.reload()
    }

    return (
        <div>
            <Head>
                <title>{jogo.jg_nome}</title>
            </Head>
            <Header/>
            <img 
                src={"http://localhost:1337"+jogo.jg_imagem[0].formats.thumbnail.url}  
            />
            <p>Nome: {jogo.jg_nome}</p>
            <p>Descrição: {jogo.jg_descricao}</p>
            <p>Desenvolvedora: {jogo.jg_desenvolvedora}</p>
            <p>Preço: R$ {jogo.jg_preco}</p>

            {isLoggedIn &&
                <button>Adicionar ao carrinho</button>
            }

            <h1>Comentários ({pagination.total})</h1>
            
            {
                isLoggedIn && <div className={style.comentarioSession}>
                    <textarea onChange={(event) => setAvaliacao(event.target.value)}cols='50' rows='5' className={style.txtArea}></textarea>
                    <button onClick={handleSaveComment}>Enviar comentário</button>
                </div>
            }
            <ul>
            {
                comentarios.map(avaliacao => (
                    <li>
                        <img 
                            width={50}
                            src={getUserImagem(avaliacao)}
                        />
                        <p>Usuário: {avaliacao.us_id.username}</p>
                        <p>Mensagem: {avaliacao.av_comentario}</p>
                    </li>
                ))
            }

            <button 
                disabled={previousButtonDisabled}
                onClick={retornarPagina}>Anterior</button>
            <button 
                disabled={nextButtonDisabled}
                onClick={avancarPagina}>Próximo</button>
            </ul>
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