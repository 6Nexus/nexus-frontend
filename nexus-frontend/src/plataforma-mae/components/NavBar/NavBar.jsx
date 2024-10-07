import * as React from "react";
import { useState } from "react";
import styles from './NavBar.module.css';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [isExpanded, setExpanded] = useState(false);

    const toggleMenu = () => {
        setExpanded(!isExpanded);
    }


    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const goToCourse = () => {
        navigate('/cursos');
    };

    const goToInstructions = () => {
        navigate('/instrucoes')
    }

    const goToProfileSettings = () => {
        navigate('/perfil')
    }

    const goToCertificates = () => {
        navigate('/certificados')
    }

    const goToSavedCourses = () => {
        navigate('/cursos-salvos')
    }

    return (
        <>
            <nav className={`${styles.navbar} ${isExpanded ? styles.expanded : ''}`} aria-label="Menu de opções da plataforma">
                <div class="menu__menu-icon" className={styles["menuIcon"]} onClick={toggleMenu}>
                    <MenuIcon sx={{ fontSize: 32, color: '#fff'}}/>
                </div>

                <div class="menu__menu-icon-options" className={styles["menuOptions"]}>
                    <div class="menu-icon-options__primary" className={styles["menuOptions__primary"]}>
                        <div className={styles["menuOptions__item"]} onClick={goToHome}>
                            <HomeIcon sx={{ fontSize: 32, color: '#fff'}}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Início</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={goToCourse}>
                                <SchoolIcon sx={{ fontSize: 32, color: '#fff'}}/>
                                {isExpanded && <span className={styles["menuOptions__item__text"]}>Cursos</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={goToInstructions}>
                            <InfoIcon sx={{ fontSize: 32, color: '#fff'}}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Instruções</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={goToProfileSettings}>
                            <AccountCircleIcon sx={{ fontSize: 32, color: '#fff'}}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Seu perfil</span>}
                        </div>
                    </div>

                    <div className={styles["menuOptions__line"]}></div>
                        
                    <div class="menu-icon-options__secondary" className={styles["menuOptions__secondary"]}>
                        <div className={styles["menuOptions__item"]} onClick={goToCertificates}>
                            <WorkspacePremiumIcon sx={{ fontSize: 32, color: '#fff'}}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Certificados</span>}
                        </div>
                        <div className={styles["menuOptions__item"]} onClick={goToSavedCourses}>
                            <FavoriteIcon sx={{ fontSize: 32, color: '#fff'}}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Salvos</span>}
                        </div>
                    </div>
                </div>

                <div class="menu__menu-icon-logout" className={styles["menuIconLogout"]}>
                    <div className={styles["menuOptions__item"]}>
                        <LogoutIcon sx={{ fontSize: 32, color: '#fff'}}/>
                        {isExpanded && <span className={styles["menuOptions__item__text"]}>Sair</span>}
                    </div>
                </div>
            </nav>
        </>
    );
};
export default NavBar;