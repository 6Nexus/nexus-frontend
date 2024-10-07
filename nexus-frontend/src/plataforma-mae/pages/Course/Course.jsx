import React from "react";
import styles from './Course.module.css'
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardCurso from "../../components/CardCurso/CardCurso";

const Course = () => {
    return (
        <>
            <div className={styles["course-container"]}>
                <NavBar />

                <div className={styles["course-container__content"]}>
                    <SearchBar />

                
                    <div className={styles["course-container__content__courseList"]}>
                        <p className={styles["courseList__title"]}>Cursos encontrados</p>
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
export default Course