import * as React from "react";
import styles from './CardModules.module.css'
import { useNavigate} from 'react-router-dom';

const CardModules = ({ idModule, idCourse, title, subtitle, inProgress }) => {
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
    };
    return (
        <>
            <div className={styles["card-curso-container"]}>
                <div className={styles['card-curso-container__informations']}>
                    <h1 className={styles['description__title']}>{title}</h1>
                    <p className={styles['description__subtitle']}>{subtitle}</p>
                </div>
                {inProgress ?
                    <div className={styles['card-curso-container__actions']}>
                        <div className={styles['actions__progress']}>
                            <div className={styles['progress__base']}>
                                <div className={styles['progress__base__bar']}></div>
                            </div>
                            <p className={styles['progress__number']}>50%</p>
                        </div>

                        <button className={styles['actions__button']} onClick={() => handleNavigation(`/cursos/${idCourse}/modulos/${idModule}`)}>
                            Continuar
                        </button>
                    </div>
                    :
                    <button className={styles['card-curso-container__button']} onClick={() => handleNavigation(`/cursos/${idCourse}/modulos/${idModule}`)}>
                        Começar
                    </button>
                }
            </div>
        </>
    );
};
export default CardModules;