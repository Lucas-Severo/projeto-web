import style from './index.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import isLogged from '../../utils/isLogged'
import { removeUserToken } from '../../redux/actions/userActions'
import { connect } from 'react-redux'
import { openCart } from '../../redux/actions/cartActions'
import Cart from '../cart/Cart'

function Header({dispatch}) {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => { 
        setIsLoggedIn(isLogged())
    })

    const handleLogout = () => {
        dispatch(removeUserToken())

        router.push('/authenticate?operation=login')
    }

    const handleOpenCart = () => {
        dispatch(openCart())
    }

    return (
        <header className={style.header}>
            <Cart/>
            <div className={style.logo}>
                <Link href='/jogos'>
                    <a>Logo</a>
                </Link>
            </div>
            <div className={style.opcoes}>
                {
                    isLoggedIn ? (
                        <div>
                            <div onClick={handleLogout}>
                                <p className={style.logoutButton}>Logout</p>
                            </div>
                            <div>
                                <button onClick={handleOpenCart}>Open cart</button>
                            </div>
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

export default connect(
    state=>state
)(Header)