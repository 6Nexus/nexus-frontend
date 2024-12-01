import * as React from "react";
import styles from './BannerInfoCourse.module.css';
import IconCourse from '../../../utils/assets/course.svg'

const BannerInfoCourse = ({ courseName, teacherName, description }) => {
    return (
        <>
            <div className={styles["bannerInfoCourse-container"]}>
                <div className={styles["bannerInfoCourse-container__icon"]}>
                    <img src={IconCourse} alt="" />
                </div>
                <div className={styles["bannerInfoCourse-container__text"]}>
                    <h2 className={styles["bannerInfoCourse-container-text__title"]}>Curso: {courseName}</h2>
                    <h4 className={styles["bannerInfoCourse-container-text__description"]}>{description} | Professor(a): {teacherName}</h4>
                </div>
                <button className={styles["bannerInfoCourse-container__button"]}>
                    Matricule-se
                </button>
            </div>
        </>
    );
};
export default BannerInfoCourse;