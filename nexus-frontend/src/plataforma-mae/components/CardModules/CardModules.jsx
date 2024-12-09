import * as React from "react";
import styles from './CardModules.module.css'
import { useNavigate } from 'react-router-dom';

const CardModules = ({ idModule, idCourse, title, subtitle, criadoEm, inProgress, showButton }) => {
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route, {state: {title, subtitle, criadoEm}});
    };
    return (
        <>
            <div className={showButton ? styles["card-curso-container"] : `${styles['card-curso-container']} ${styles['disable']}` }>
                <div className={styles['card-curso-container__informations']}>
                    <h1 className={showButton ? styles['description__title'] : `${styles['description__title']} ${styles['disable__text']}`}>{title}</h1>
                    <p className={showButton ? styles['description__subtitle'] : `${styles['description__subtitle']} ${styles['disable__text']}` }>{subtitle}</p>
                </div>
                {inProgress ? (
                    <div className={styles['card-curso-container__actions']}>
                        <div className={styles['actions__progress']}>
                            <div className={styles['progress__base']}>
                                <div className={styles['progress__base__bar']}></div>
                            </div>
                            <p className={styles['progress__number']}>50%</p>
                        </div>

                        <button className={styles['actions__button']} onClick={() => handleNavigation(`/aluno/cursos/${idCourse}/modulos/${idModule}`)}>
                            Continuar
                        </button>
                    </div>
                ) : (
                    showButton && (
                        <button className={styles['card-curso-container__button']} onClick={() => handleNavigation(`/aluno/cursos/${idCourse}/modulos/${idModule}`)}>
                            Começar
                        </button>
                    )
                )}
            </div>
        </>
    );
};
export default CardModules;