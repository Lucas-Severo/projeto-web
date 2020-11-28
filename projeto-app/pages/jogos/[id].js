import JogoApiRequest from '../src/core/JogoApiRequest'
import AvaliacaoApiRequest from '../src/core/AvaliacaoApiRequest'
import Header from '../../components/header'
import Head from 'next/head'
import IsLogged from '../../utils/isLogged'
import style from './jogo.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GetJogoMedia from '../../utils/getJogoMedia'
import Warning from '../../components/warnings/warning'
import Stars from '../../components/stars/Stars'

const pagination = {
    start: 0,
    end: 8,
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
    const [nota, setNota] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [warnings, setWarnings] = useState('')

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
        if (hasImage(avaliacao)) {
            return "http://localhost:1337"+avaliacao.us_id.user_imagem.formats.thumbnail.url
        }
    }

    const hasImage = (avaliacao) => {
        if (avaliacao.us_id.user_imagem) {
            return true
        }
        return false
    }

    const handleSaveComment = async () => {
        if (!checkWarnings()) {    
            const requestBody = {
                av_comentario: avaliacao,
                jg_id: jogo.id,
                nota: nota
            }
            await AvaliacaoApiRequest.salvar(requestBody)
            router.reload()
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
                        <p className={style.jogoNota}><Stars key={jogo.id} nota={GetJogoMedia.getMedia(jogo)}/></p>
                    </div>
                    <p>Nome: {jogo.jg_nome}</p>
                    <p>Descrição: {jogo.jg_descricao}</p>
                    <p>Desenvolvedora: {jogo.jg_desenvolvedora}</p>
                    <p>Preço: R$ {jogo.jg_preco}</p>
                    {isLoggedIn &&
                        <button>Adicionar ao carrinho</button>
                    }
                </div>

                <h1 className={style.comentarios__title}>Comentários ({pagination.total})</h1>
                
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
                    comentarios.map(avaliacao => (
                        <li className={style.comentario} key={avaliacao.id}>
                            <div>
                            <p className={style.comentario__user_name}>Usuário: {avaliacao.us_id.username}</p>
                            <p className={style.texto}>{avaliacao.av_comentario}</p>
                            </div>
                            <div className={style.stars}>
                                <Stars key={avaliacao.id} nota={avaliacao.nota}/>
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
