import { useEffect } from "react"
import {useState} from 'react'
import style from './stars.module.css'
import StarOutlinedIcon from '@material-ui/icons/StarOutlined'
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import StarHalfOutlinedIcon from '@material-ui/icons/StarHalfOutlined';

export default function Stars({nota, uid}) {
    
    const [stars, setStars] = useState([])    

    useEffect(() => {
        const starsArray = []
        const positiveStars = Math.floor(nota)
        const halfStars = Math.floor((nota - positiveStars) / 0.5)
        const negativeStars = 5 - positiveStars - halfStars

        for(let i = 0; i < positiveStars; i++) {
            starsArray.push(<StarOutlinedIcon className={style.goldStar}/>)
        }

        for (let i = 0; i < halfStars; i++) {
            starsArray.push(<StarHalfOutlinedIcon className={style.goldStar}/>)
        }

        for(let i = 0; i < negativeStars; i++) {
            starsArray.push(<StarOutlineOutlinedIcon/>)
        }

        setStars(starsArray)
    }, [nota])

    return (
        <div key={uid} className={style.starsContainer}>
        <p key={uid}>{nota}</p>
            {
                stars.map((star, index) => (
                    <p key={uid+"__star__"+index}>{star}</p>
                ))
            }
        </div>
    )
}
