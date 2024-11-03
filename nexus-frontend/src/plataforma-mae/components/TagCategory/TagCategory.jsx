import * as React from "react";
import styles from './TagCategory.module.css';

const TagCategory = ({category, isActive, onClick}) => {

    return (
        <>
            <div className={`${styles["tag-category-container"]} ${isActive ? styles["active"] : ""}`} onClick={onClick}>
                <p className={styles["tag-category-container__category"]}>
                    {category}
                </p>
            </div>
        </>
    );
};
export default TagCategory;