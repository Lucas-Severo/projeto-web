import { useEffect } from 'react'
import style from './warning.module.css'

export default function Warning({message}) {
    return (
        <div>
            <p className={style.warning__text}>{message}</p>
        </div>
    )
}