import React from "react";
import styles from './Home.module.css'
import NavBar from "../../components/NavBar/NavBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CardCurso from '../../components/CardCurso/CardCurso.jsx';
import Banner from '../../components/Banner/Banner.jsx'
import IconCourse from '../../../utils/assets/course.svg'
import IconInstructions from '../../../utils/assets/instructions.svg'
import IconProfile from '../../../utils/assets/profile.svg'


const Home = () => {
    return (
        <>
            <div className={styles["home-container"]}>
                <NavBar />

                <div className={styles["home-container__content"]}>
                    <SearchBar />
                    <Banner />

                    <div className={styles["home-container__content__options"]}>
                        <div className={`${styles["content__options__option"]} ${styles["course"]}`}>
                            <img src={IconCourse} alt="" />
                            <p className={styles["options__option__text"]}>Ver cursos</p>
                        </div>

                        <div className={`${styles["content__options__option"]} ${styles["instructions"]}`}>
                            <img src={IconInstructions} alt="" />
                            <p className={styles["options__option__text"]}>Instruções</p>
                        </div>

                        <div className={`${styles["content__options__option"]} ${styles["profile"]}`}>
                            <img src={IconProfile} alt="" />
                            <p className={styles["options__option__text"]}>Meu perfil</p>
                        </div>
                    </div>


                    <div className={styles["home-container__content__courseList"]}>
                        <p className={styles["courseList__title"]}>Continue assistindo</p>
                        <div className={styles["courseList__cards"]}>
                            <CardCurso/>
                            <CardCurso/>
                            <CardCurso/>
                        </div>
                    </div>
                </div>
            </div>
                
        </>
    );
};
export default Home