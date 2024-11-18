import React, { useEffect, useState } from "react";
import styles from './HeaderCategory.module.css';
import TagCategory from "../TagCategory/TagCategory";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const HeaderCategory = ({ activeCategory, setActiveCategory }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [categoriesPerPage, setCategoriesPerPage] = useState(10);

    const categories = [
        "Todos", "Cidadania", "Autocuidado", "Culinária", "Tecnologia",
        "Idiomas", "Artes", "Empreendedorismo", "Esportes", "Música",
        "Literatura", "Filosofia", "História", "Ciências", "Matemática",
        "Saúde", "Educação", "Design", "Fotografia", "Programação",
        "Redação", "Gestão"
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 560) {
                setCategoriesPerPage(2);
            } else if (window.innerWidth <= 700) {
                setCategoriesPerPage(3);
            } else if (window.innerWidth <= 900) {
                setCategoriesPerPage(4);
            } else if (window.innerWidth <= 1500) {
                setCategoriesPerPage(5);
            } else if (window.innerWidth <= 1700) {
                setCategoriesPerPage(7);
            } else if (window.innerWidth <= 1900) {
                setCategoriesPerPage(9);
            } else {
                setCategoriesPerPage(10);
            }
            setCurrentPage(0);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(categories.length / categoriesPerPage);
    const displayedCategories = categories.slice(
        currentPage * categoriesPerPage,
        (currentPage + 1) * categoriesPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <>
            <div className={styles["course-container__content__category"]}>
                <p className={styles["category__title"]}>Categorias de cursos</p>
                <div className={styles["category__cards"]}>
                    <div className={styles['listCategory']}>
                        {currentPage !== 0 && (
                            <ArrowBackIosNewIcon
                                className={styles["category__card__button"]}
                                onClick={handlePreviousPage}
                            />
                        )}
                        {displayedCategories.map((category) => (
                            <TagCategory
                                key={category}
                                category={category}
                                isActive={category === activeCategory}
                                onClick={() => setActiveCategory(category)} 
                            />
                        ))}
                    </div>

                    {currentPage !== totalPages - 1 && (
                        <ArrowForwardIosIcon
                            className={styles["category__card__button"]}
                            onClick={handleNextPage}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default HeaderCategory;
