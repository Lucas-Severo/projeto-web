import style from './index.module.css'
import Header from '../../components/header'
import AuthenticateApiRequest from '../src/core/AuthenticateApiRequest'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Auth() {

    const router = useRouter();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const [sucess, setSucess] = useState(false);
    const [informationMessage, setInformationMessage] = useState();

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
            sessionStorage.setItem('Authorization', `Bearer ${data.jwt}`)
            router.push('/jogos')
        } catch (error) {
            showErrorMessage("Erro ao tentar conectar, email ou senha inválidos")
        }
    }

    const register = async () => {
        try {
            await AuthenticateApiRequest.register(userName, email, password)
            setError(false)
            setSucess(true)
            setInformationMessage('registrado com sucesso!')
        } catch (error) {
            showErrorMessage("Erro ao tentar registrar conta")
        }
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
                    <div className={style.credencial}>
                        <label className={style.label} htmlFor="userName">Username:</label>
                        <input autoComplete="off" onChange={event => setUserName(event.target.value)} className={style.input} type="text" id="userName"/>
                    </div>
                    <div className={style.credencial}>
                        <label className={style.label} htmlFor="email">Email:</label>
                        <input autoComplete="off" onChange={event => setEmail(event.target.value)} className={style.input} type="email" id="email"/>
                    </div>
                    <div className={style.credencial}>
                        <label className={style.label} htmlFor="password">Senha:</label>
                        <input autoComplete="off" onChange={event => setPassword(event.target.value)} className={style.input} type="password" id="password"/>
                    </div>
                    <input onClick={handleClick} className={style.submitButton} value="Log In" type="submit"/>
                    <input onClick={handleRegister} className={style.submitButton} value="Sign up" type="submit"/>
                    {
                        error ? (
                            <div>
                                <p className={style.errorMessage}>{informationMessage}</p>
                            </div>
                        ) : ''
                    }
                    {
                        sucess ? (
                            <div>
                                <p className={style.sucessMessage}>{informationMessage}</p>
                            </div>
                        ) : ''
                    }
                </form>
            </div>
        </div>
    );
}