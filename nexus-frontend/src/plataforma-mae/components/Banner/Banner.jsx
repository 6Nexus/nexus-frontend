import * as React from "react";
import styles from './Banner.module.css';

const Banner = () => {
    return (
        <>
            <div className={styles["banner-container"]}>
                <div className={styles["banner-container__text"]}>
                    <h2>Olá, Maria Helena </h2>
                    <h4>Esta plataforma foi pensada para você. Aproveite as funcionalidades abaixo e torne sua experiência ainda melhor</h4>
                </div>
               <div className={styles["banner-container__button"]}>
                    <button>Ver mais</button>
               </div>
            </div>  
        </>
    );
};
export default Banner;