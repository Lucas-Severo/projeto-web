import style from './index.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import isLogged from '../../utils/isLogged'

export default function Header() {

    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => { 
        setIsLoggedIn(isLogged())
    })

    const handleLogout = () => {
        sessionStorage.removeItem('Authorization')

        if (router.route === '/jogos') {
            router.reload()
        } else {
            router.push('/authenticate?operation=login')
        }
    }

    return (
        <header className={style.header}>
            <div className={style.logo}>Logo</div>
            <div className={style.opcoes}>
                {
                    isLoggedIn ? (
                        <div onClick={handleLogout}>
                            <p className={style.logoutButton}>Logout</p>
                        </div>
                    ) : (
                        <div className={style.authenticate}>
                            <Link href="/authenticate?operation=login" teste="a">
                                <a>Login</a>
                            </Link>
                            <Link href="/authenticate">
                                <a>Sign up</a>
                            </Link>
                        </div>
                    )
                }
            </div>
        </header>
    );
}