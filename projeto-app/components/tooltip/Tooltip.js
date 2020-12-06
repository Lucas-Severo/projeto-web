import style from './tooltip.module.css'
import {useState} from 'react'

export default function Tooltip({message}) {

    const [toggle, setToggle] = useState(false)

    const enableToggle = () => {
        setToggle(true)
    }

    const disableToggle = () => {
        setToggle(false)
    }

    return (
        <div onMouseOut={disableToggle} className={style.container}>
            {
                toggle && 
                (
                    <div
                        className={style.tooltip}>
                        <p>{message}</p>
                    </div>
                )
            }
            <p className={style.description}
                onMouseOver={enableToggle}>{message}</p>
        </div>
    )

}