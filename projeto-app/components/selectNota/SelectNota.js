import {useEffect, useState} from 'react'
import style from './select_nota.module.css'
import StarOutlinedIcon from '@material-ui/icons/StarOutlined'
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import { connect } from 'react-redux';
import {setNota} from '../../redux/actions/avaliacoesActions'

function SelectNota({dispatch, avaliacaoReducer}) {
    
    const [notas, setNotas] = useState([
        <StarOutlineOutlinedIcon className={style.nota} key={"select_nota_1"} onClick={() => tratarEventoEstrelaPintar(0)}/>,
        <StarOutlineOutlinedIcon className={style.nota} key={"select_nota_2"} onClick={() => tratarEventoEstrelaPintar(1)}/>,
        <StarOutlineOutlinedIcon className={style.nota} key={"select_nota_3"} onClick={() => tratarEventoEstrelaPintar(2)}/>,
        <StarOutlineOutlinedIcon className={style.nota} key={"select_nota_4"} onClick={() => tratarEventoEstrelaPintar(3)}/>,
        <StarOutlineOutlinedIcon className={style.nota} key={"select_nota_5"} onClick={() => tratarEventoEstrelaPintar(4)}/>
    ])

    useEffect(() => {
        if(avaliacaoReducer.nota === 0) {
            limparEstrelas()
        }
    }, [avaliacaoReducer.nota])

    const tratarEventoEstrelaPintar = async (index) => {
        dispatch(setNota(index+1))
        const estrelas = []
        for(let i = 0; i < 5; i++) {
            if (i <= index) {
                estrelas.push(
                    <StarOutlinedIcon 
                        className={style.nota_selecionada} 
                        key={"select_nota_"+i}
                        onClick={() => tratarEventoEstrelaPintar(i)}/>)
            } else {
                estrelas.push(
                    <StarOutlineOutlinedIcon 
                        className={style.nota} 
                        key={"select_nota_"+i}
                        onClick={() => tratarEventoEstrelaPintar(i)}/>)
            }
        }
        await setNotas([])
        inserirNotas(estrelas)
    }

    const limparEstrelas = async () => {
        const estrelas = []
        for(let i = 0; i < 5; i++) {
            estrelas.push(
                <StarOutlineOutlinedIcon 
                    className={style.nota} 
                    key={"select_nota_"+i}
                    onClick={() => tratarEventoEstrelaPintar(i)}/>
            )
        }
        await setNotas([])
        inserirNotas(estrelas)
    }

    const inserirNotas = (notas) => {
        setNotas(notas)
    }

    return (
        <div key={"select_nota"} className={style.starsContainer}>
            {
                notas.map(nota => (
                    nota
                ))
            }
        </div>
    )
}

export default connect(
    state=>state
)(SelectNota)
