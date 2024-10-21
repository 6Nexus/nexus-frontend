import React, { useState } from "react"; 
import styles from './HeaderCategory.module.css';
import TagCategory from "../TagCategory/TagCategory";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HeaderCategory = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");

    const categories = [
        "Todos", "Cidadania", "Autocuidado", "Culinária", "Tecnologia", "Idiomas", "Artes", "Empreendedorismo"
    ];
    
    return (
        <>
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
                    <ArrowForwardIosIcon className={styles["category__card__button"]} />
                </div>
            </div>
        </>
    );
};
export default HeaderCategory;
