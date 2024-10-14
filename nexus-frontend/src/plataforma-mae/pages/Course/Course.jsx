import React, { useState } from "react";
import styles from './Course.module.css'
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardCurso from "../../components/CardCurso/CardCurso";
import TagCategory from "../../components/TagCategory/TagCategory";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Course = () => {
    const [activeCategory, setActiveCategory] = useState("Todos"); 

    const categories = [
        "Todos", "Cidadania", "Autocuidado", "Culinária", "Tecnologia", "Idiomas", "Artes", "Empreendedorismo"
    ];

    return (
        <>
            <div className={styles["course-container"]}>
                <SideBar backgroundColor={'#245024'}/>

                <div className={styles["course-container__content"]}>
                    <SearchBar />
                    
                    <div className={styles["course-container__content__category"]}>
                        <p className={styles["category__title"]}>Categorias de cursos</p>
                        <div className={styles["category__cards"]}>
                            {categories.map((category) => (
                                <TagCategory
                                    key={category}
                                    category={category}
                                    isActive={category === activeCategory}  
                                    onClick={() => setActiveCategory(category)} 
                                />
                            ))}
                            <AddCircleOutlineIcon className={styles["category__card__button"]}/>
                        </div>
                    </div>
                
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