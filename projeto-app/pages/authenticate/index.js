import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header'
import { addUserToken } from '../../redux/actions/userActions'
import AuthenticateApiRequest from '../src/core/AuthenticateApiRequest'
import style from './index.module.css'

function Auth({dispatch}) {

    const router = useRouter();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const [sucess, setSucess] = useState(false);
    const [informationMessage, setInformationMessage] = useState();

    useEffect(() => {
        limparCampos()
        limparMessages()
    }, [router.query])

    const handleClick = event => {
        event.preventDefault()
        authenticate()
    }

    const handleRegister = event => {
        event.preventDefault()
        register()
    }

    const authenticate = async () => {
        try {
            const {data} = await AuthenticateApiRequest.autenticar(email, password)
            dispatch(addUserToken({
                jwt: `Bearer ${data.jwt}`, 
                id: data.user.id, 
                email: data.user.email,
                userName: data.user.username}))
            router.push('/jogos')
        } catch (error) {
            showErrorMessage("Erro ao tentar conectar, email ou senha inválidos")
            limparMessages()
        }
    }

    const register = async () => {
        try {
            await AuthenticateApiRequest.register(userName, email, password)
            setError(false)
            setSucess(true)
            setInformationMessage('registrado com sucesso!')
            limparCampos()
        } catch (error) {
            showErrorMessage("Erro ao tentar registrar conta")
            limparMessages()
        }
    }

    const limparCampos = () => {
        setUserName("")
        setEmail("")
        setPassword("")
    }

    const limparMessages = () => {
        setTimeout(() => {
            setError(false)
            setSucess(false)
            showErrorMessage("")
        }, 1500)
    }

     const showErrorMessage = (message) => {
        setInformationMessage(message)
        setError(true)
        setSucess(false)
     }

    return (
        <div className={style.authenticatePage}>
            <Head>
                <title>Autenticação</title>
            </Head>
            <Header/>
            <div className={style.container}>
                <form>
                    { router.query.operation !== 'login' &&
                        <div className={style.credencial}>
                            <label className={style.label} htmlFor="userName">Username:</label>
                            <input autoComplete="off" value={userName} onChange={event => setUserName(event.target.value)} className={style.input} type="text" id="userName"/>
                        </div>
                    }
                    <div className={style.credencial}>
                        <label className={style.label} htmlFor="email">Email:</label>
                        <input autoComplete="off" value={email} onChange={event => setEmail(event.target.value)} className={style.input} type="email" id="email"/>
                    </div>
                    <div className={style.credencial}>
                        <label className={style.label} htmlFor="password">Senha:</label>
                        <input autoComplete="off" value={password} onChange={event => setPassword(event.target.value)} className={style.input} type="password" id="password"/>
                    </div>
                    { router.query.operation === 'login' ?
                        <input onClick={handleClick} className={style.submitButton} value="Log In" type="submit"/>
                        : <input onClick={handleRegister} className={style.submitButton} value="Sign up" type="submit"/>
                    }
                    {
                        error && (
                            <div>
                                <p className={style.errorMessage}>{informationMessage}</p>
                            </div>
                        )
                    }
                    {
                        sucess && (
                            <div>
                                <p className={style.sucessMessage}>{informationMessage}</p>
                            </div>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default connect(
    state=>state
)(Auth)