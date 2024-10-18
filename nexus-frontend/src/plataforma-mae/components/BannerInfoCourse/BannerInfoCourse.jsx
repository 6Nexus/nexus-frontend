import * as React from "react";
import styles from './BannerInfoCourse.module.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const BannerInfoCourse = ({backgroundImage, titleCourse, descriptionCourse, duration}) => {
    const bannerStyle = {
        backgroundImage: `url(${backgroundImage})`,
      };
    return (
        <>
            <div className={styles["bannerInfoCourse-container"]} style={bannerStyle}>
                <div className={styles["bannerInfoCourse-container__text"]}>
                    <h2 className={styles["bannerInfoCourse-container-text__title"]}>{titleCourse}</h2>
                    <h4 className={styles["bannerInfoCourse-container-text__description"]}>{descriptionCourse}</h4>
                </div>
               <div className={styles["bannerInfoCourse-container__line"]}></div>
               <div className={styles["bannerInfoCourse-container__infoDuration"]}>
                    <AccessTimeIcon/>
                    <p>Duração: { duration } horas</p>
               </div>
            </div>  
        </>
    );
};
export default BannerInfoCourse;