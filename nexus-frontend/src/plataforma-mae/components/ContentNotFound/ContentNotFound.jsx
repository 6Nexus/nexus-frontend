import * as React from "react";
import styles from './ContentNotFound.module.css';
import { useNavigate } from 'react-router-dom';
import imgContentNotFound from "../../../utils/assets/conteudo_nao_encontrado.svg"

const ContentNotFound = ({content}) => {
    return (
        <>
            <div className={styles["contentNotFound-container"]}>
               <img src={imgContentNotFound} alt="" />
               <p>{content}</p>
            </div>  
        </>
    );
};
export default ContentNotFound;