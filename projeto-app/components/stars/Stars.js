import { useEffect } from "react"
import {useState} from 'react'
import style from './stars.module.css'

export default function Stars({nota, uid}) {
    
    const [stars, setStars] = useState([])    

    useEffect(() => {
        const starsArray = []
        const positiveStars = Math.floor(nota)
        const negativeStars = 5 - Math.floor(nota)

        for(let i = 0; i < positiveStars; i++) {
            starsArray.push('⭑')
        }

        for(let i = 0; i < negativeStars; i++) {
            starsArray.push('⭒')
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
