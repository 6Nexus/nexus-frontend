import React from "react";
import styles from './SavedCourses.module.css'
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardCurso from "../../components/CardCurso/CardCurso";
import HeaderCategory from "../../components/HeaderCategory/HeaderCategory";

const SavedCourses = () => {
    return (
        <>
            <div className={styles["savedCourses-container"]}>
                <SideBar backgroundColor={'#245024'}/>

                <div className={styles["savedCourses-container__content"]}>
                    <SearchBar />
                    
                    <HeaderCategory/>
                
                    <div className={styles["savedCourses-container__content__savedCoursesList"]}>
                        <p className={styles["savedCoursesList__title"]}>Cursos encontrados</p>
                        <div className={styles["savedCoursesList__cards"]}>
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
export default SavedCourses