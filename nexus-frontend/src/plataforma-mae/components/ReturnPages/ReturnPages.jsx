import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from './ReturnPages.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ReturnPages = () => {
    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <>
            <div className={styles['returnPages-container']}>
                <ArrowBackIcon className={styles['return__icon']} onClick={() => handleNavigation(`/aluno/cursos`)} />
                <p className={styles['return__text']}>Voltar</p>
            </div>
        </>
    );
};
export default ReturnPages