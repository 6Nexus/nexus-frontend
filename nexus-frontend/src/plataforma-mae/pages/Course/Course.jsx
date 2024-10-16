import React from "react";
import styles from './Course.module.css'
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardCurso from "../../components/CardCurso/CardCurso";
import HeaderCategory from "../../components/HeaderCategory/HeaderCategory";

const Course = () => {
    return (
        <>
            <div className={styles["course-container"]}>
                <SideBar backgroundColor={'#245024'}/>

                <div className={styles["course-container__content"]}>
                    <SearchBar />
                    
                    <HeaderCategory/>
                
                    <div className={styles["course-container__content__courseList"]}>
                        <p className={styles["courseList__title"]}>Cursos encontrados</p>
                        <div className={styles["courseList__cards"]}>
                            <CardCurso title="Culinária brasiliera" subtitle="Modulo 1: Primeiro livro de receitas" textButton="Ver curso" inProgress={false}/>
                            <CardCurso title="Automaquiagem" subtitle="Modulo 1: Maquiagem dia-a-dia" textButton="Ver curso" inProgress={false}/>
                            <CardCurso title="Informática básica" subtitle="Modulo 1: Pacote office" textButton="Continuar" inProgress={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Course