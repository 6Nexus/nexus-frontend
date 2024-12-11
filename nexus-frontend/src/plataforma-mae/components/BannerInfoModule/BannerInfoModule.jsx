import * as React from "react";
import styles from './BannerInfoModule.module.css';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const BannerInfoModule = ({ titleModule, descriptionModule, duration, date }) => {
    return (
        <>
            <div className={styles["bannerInfoModule-container"]}>
                <div className={styles["bannerInfoModule-container__infoDuration"]}>
                    <OndemandVideoIcon sx={{ fontSize: 52 }}/>
                    <p>Duração: {duration} aulas</p>
                </div>
                <div className={styles["bannerInfoModule-container__line"]}></div>
                <div className={styles["bannerInfoModule-container__text"]}>
                    <h2 className={styles["bannerInfoModule-container-text__title"]}>{titleModule}</h2>
                    <h4 className={styles["bannerInfoModule-container-text__description"]}>{descriptionModule}</h4>
                </div>
                <div className={styles["bannerInfoModule-container__line"]}></div>
                <div className={styles["bannerInfoModule-container__infoDate"]}>
                    <CalendarMonthIcon sx={{ fontSize: 52 }}/>
                    <p>Criação: {date}</p>
                </div>
            </div>
        </>
    );
};
export default BannerInfoModule;