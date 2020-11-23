import style from './index.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Header() {

    const router = useRouter()
    const [token, setToken] = useState()

    useEffect(() => {
        const token = sessionStorage.getItem('Authorization')
        
        if (token && typeof token === 'string') {
            setToken(token)
        }
    })

    const handleLogout = () => {
        sessionStorage.removeItem('Authorization')

        if (router.route === '/jogos') {
            router.reload()
        } else {
            router.push('/jogos')
        }
    }

    return (
        <header className={style.header}>
            <div className={style.logo}>Logo</div>
            <div className={style.opcoes}>
                {
                    token ? (
                        <div onClick={handleLogout}>
                            <p className={style.logoutButton}>Logout</p>
                        </div>
                    ) : (
                        <div>
                            <Link href="/authenticate">
                                <a>Login</a>
                            </Link>
                        </div>
                    )
                }
            </div>
        </header>
    );
}