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

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NavBar = () => {
    const [isExpanded, setExpanded] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const navigate = useNavigate();
    const location = useLocation();  

    const toggleMenu = () => {
        setExpanded(!isExpanded);
    };

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/') {
            setActiveItem('home');
        } 
        
        if (currentPath === '/cursos') {
            setActiveItem('courses');
        } 
        
        if (currentPath === '/instrucoes') {
            setActiveItem('instructions');
        } 
        
        if (currentPath === '/perfil') {
            setActiveItem('profileSettings');
        } 
        
        if (currentPath === '/certificados') {
            setActiveItem('certificates');
        } 
        
        if (currentPath === '/cursos-salvos') {
            setActiveItem('saved');
        }
    }, [location]);

    const handleNavigation = (item, route) => {
        setActiveItem(item);
        navigate(route);
    };

    return (
        <>
            <nav className={`${styles.navbar} ${isExpanded ? styles.expanded : ''}`} aria-label="Menu de opções da plataforma">
                <div className={styles["menuIcon"]} onClick={toggleMenu}>
                    <MenuIcon sx={{ fontSize: 32, color: '#fff'}}/>
                </div>

                <div className={styles["menuOptions"]}>
                    <div className={styles["menuOptions__primary"]}>
                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('home', '/')}>
                            <HomeIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'home' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Início</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('courses', '/cursos')}>
                            <SchoolIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'courses' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Cursos</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('instructions', '/instrucoes')}>
                            <InfoIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'instructions' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Instruções</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('profileSettings', '/perfil')}>
                            <AccountCircleIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'profileSettings' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Seu perfil</span>}
                        </div>
                    </div>

                    <div className={styles["menuOptions__line"]}></div>

                    <div className={styles["menuOptions__secondary"]}>
                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('certificates', '/certificados')}>
                            <WorkspacePremiumIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'certificates' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Certificados</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('saved', '/cursos-salvos')}>
                            <FavoriteIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'saved' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Salvos</span>}
                        </div>
                    </div>
                </div>

                <div className={styles["menuIconLogout"]}>
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
