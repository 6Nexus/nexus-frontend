import * as React from "react";
import styles from './CardCurso.module.css'
import imagemCapa from '../../../utils/assets/capa_curso.jpg'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useNavigate } from 'react-router-dom';

const CardCurso = ({ id, title, subtitle, inProgress, progress, category, showIcon, imageUrl }) => {
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <>
            <div className={styles["card-curso-container"]}>
                <div className={styles["card-curso-container__info"]}>
                    <div className={styles["card-curso-container__info__image"]}>
                        <img src={imageUrl ? imageUrl : imagemCapa} alt="" />
                    </div>
                    <div className={styles["card-curso-container__info__content"]}>
                        <div className={styles["card-curso-container__info__content__titles"]}>
                            <h2 className={styles["info__content__titles__title"]}>{title}</h2>
                            <h4 className={styles["info__content__titles__subtitle"]}>{subtitle}</h4>
                            <p className={styles["info__content__titles__tag"]}>{category}</p>
                        </div>

                        {showIcon &&
                            <div className={styles["card-curso-container__info__content__button"]}>
                                <button>
                                    <BookmarkAddedIcon className={styles["content__button__icon-liked"]} style={{ fontSize: 33 }} />
                                </button>
                            </div>
                        }
                    </div>
                </div>

                <div className={inProgress ? styles["card-curso-container__button"] : styles["card-curso-container__button-secondary"]}>
                    <button onClick={() => handleNavigation(`/aluno/cursos/${id}/modulos`)}>
                        {inProgress ? "Continuar" : "Ver curso"}
                    </button>

                    {inProgress && <p className={styles["button__progress"]}>Progresso: {progress}%</p>}
                </div>
            </div>
        </>
    );
};
export default CardCurso;