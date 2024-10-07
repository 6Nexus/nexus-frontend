import React, { useState } from "react";
import styles from './Course.module.css'
import NavBar from "../../components/NavBar/NavBar";
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
                <NavBar />

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