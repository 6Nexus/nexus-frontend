import * as React from "react";
import styles from './CardCurso.module.css'
import imagemTeste from '../../../utils/assets/imagem-card-teste.png'
import FavoriteIcon from '@mui/icons-material/Favorite';

const CardCurso = ({title, subtitle, textButton, inProgress}) => {
    return (
        <>
           <div className={styles["card-curso-container"]}>
                <div className={styles["card-curso-container__info"]}>
                    <div className={styles["card-curso-container__info__image"]}>
                        <img src={imagemTeste} alt="" />
                    </div>
                    <div className={styles["card-curso-container__info__content"]}>
                        <div className={styles["card-curso-container__info__content__titles"]}>
                                <h2 className={styles["info__content__titles__title"]}>{title}</h2>
                                <h4 className={styles["info__content__titles__subtitle"]}>{subtitle}</h4>
                        </div>

                        <div className={styles["card-curso-container__info__content__button"]}>
                            <button>
                                <FavoriteIcon className={styles["content__button__icon"]}/>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className={ inProgress ? styles["card-curso-container__button"] : styles["card-curso-container__button-secondary"]}>
                    <button>
                        {textButton}
                    </button>

                    { inProgress && <p className={styles["button__progress"]}>Progresso: 20%</p>}
                </div>
           </div>
        </>
    );
};
export default CardCurso;