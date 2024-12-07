import React from "react";
import styles from './Home.module.css';
import Banner from '../../components/Banner/Banner.jsx';
import IconCourse from '../../../utils/assets/course.svg';
import IconInstructions from '../../../utils/assets/instructions.svg';
import IconProfile from '../../../utils/assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import Main from "../Main/Main.jsx";

const Home = () => {
    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <Main>
            <div className={styles["home-container"]}>
                <div className={styles["home-container__content"]}>
                    <Banner />

                    <div className={styles["home-container__content__options"]}>
                        <div className={`${styles["content__options__option"]} ${styles["course"]}`} onClick={() => handleNavigation(`/aluno/cursos`)}>
                            <img src={IconCourse} alt="" />
                            <p className={styles["options__option__text"]}>Ver cursos</p>
                        </div>

                        <div className={`${styles["content__options__option"]} ${styles["instructions"]}`} onClick={() => handleNavigation(`/aluno/instrucoes`)}>
                            <img src={IconInstructions} alt="" />
                            <p className={styles["options__option__text"]}>Ajuda</p>
                        </div>

                        <div className={`${styles["content__options__option"]} ${styles["profile"]}`} onClick={() => handleNavigation(`/aluno/perfil`)}>
                            <img src={IconProfile} alt="" />
                            <p className={styles["options__option__text"]}>Meu perfil</p>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Home;
