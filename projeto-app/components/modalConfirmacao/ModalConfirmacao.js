import style from './modal_confirmacao.module.css'
import Close from '@material-ui/icons/Close'

export default function ModalConfirmacao({showModal, message, agree_listener, close_listener}) {
    return (
        <div className={style.modal}>
        {
            showModal && (<div className={style.container}>
                <div className={style.modalHeader}>
                    <Close onClick={close_listener}/>
                </div>
                <div className={style.content}>
                    <p>{message}</p>
                </div>
                <div className={style.actions}>
                    <button onClick={agree_listener}>
                        Sim
                    </button>
                    <button onClick={close_listener}>
                        Não
                    </button>
                </div>
            </div>
            )
        }
        </div>
    );
}