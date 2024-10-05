import * as React from "react";
import styles from './CardCurso.module.css'
import imagemTeste from '../../../utils/assets/imagem-card-teste.png'
import FavoriteIcon from '@mui/icons-material/Favorite';

const CardCurso = () => {
    return (
        <>
           <div className={styles["card-curso-container"]}>
                <div className={styles["card-curso-container__info"]}>
                    <div className={styles["card-curso-container__info__image"]}>
                        <img src={imagemTeste} alt="" />
                    </div>
                    <div className={styles["card-curso-container__info__content"]}>
                        <div className={styles["card-curso-container__info__content__titles"]}>
                                <h2>Titulo do curso</h2>
                                <h4>Subtitulo do curso</h4>
                        </div>

                        <div className={styles["card-curso-container__info__content__button"]}>
                            <button>
                                <FavoriteIcon className={styles["content__button__icon"]}/>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className={styles["card-curso-container__button"]}>
                    <button>
                        Continuar
                    </button>

                    <p>Progresso: 20%</p>
                </div>
           </div>
        </>
    );
};
export default CardCurso;