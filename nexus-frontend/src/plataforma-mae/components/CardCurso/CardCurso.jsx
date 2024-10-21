import * as React from "react";
import styles from './CardCurso.module.css'
import imagemTeste from '../../../utils/assets/imagem-card-teste.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useLocation } from 'react-router-dom';

const CardCurso = ({id, title, subtitle, inProgress, progress, category, liked, imageUrl}) => {
    const navigate = useNavigate();
    const location = useLocation();  

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <>
           <div className={styles["card-curso-container"]}>
                <div className={styles["card-curso-container__info"]}>
                    <div className={styles["card-curso-container__info__image"]}>
                        <img src={imageUrl ? imageUrl : imagemTeste } alt="" />
                    </div>
                    <div className={styles["card-curso-container__info__content"]}>
                        <div className={styles["card-curso-container__info__content__titles"]}>
                                <h2 className={styles["info__content__titles__title"]}>{title}</h2>
                                <h4 className={styles["info__content__titles__subtitle"]}>{subtitle}</h4>
                                <p className={styles["info__content__titles__tag"]}>{category}</p>
                        </div>

                        <div className={styles["card-curso-container__info__content__button"]}>
                            <button>
                                <FavoriteIcon className={ liked ? styles["content__button__icon-liked"] : styles["content__button__icon"] } style={{fontSize: 33}}/>
                                { liked ? "Salvo" : "Salvar"}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className={ inProgress ? styles["card-curso-container__button"] : styles["card-curso-container__button-secondary"]}>
                    <button onClick={() => handleNavigation(`/cursos/${id}`)}>
                        { inProgress ? "Continuar" : "Ver curso"}
                    </button>

                    { inProgress && <p className={styles["button__progress"]}>Progresso: {progress}%</p>}
                </div>
           </div>
        </>
    );
};
export default CardCurso;