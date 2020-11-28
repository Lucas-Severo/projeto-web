import { useEffect } from "react"
import {useState} from 'react'
import style from './stars.module.css'

export default function Stars({nota}) {
    
    const [stars, setStars] = useState([])    

    useEffect(() => {
        const stars = []
        const positiveStars = Math.floor(nota)
        const negativeStars = 5 - Math.floor(nota)

        for(let i = 0; i < positiveStars; i++) {
            stars.push('⭑')
        }

        for(let i = 0; i < negativeStars; i++) {
            stars.push('⭒')
        }
        setStars(stars)
    }, [])

    return (
        <div className={style.starsContainer}>
        <p>{nota}</p>
            {
                stars.map(star => (
                    <p>{star}</p>
                ))
            }
        </div>
    )
}