import * as React from "react";
import { useState } from "react";
import styles from './SideBar.module.css';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const SideBar = ({backgroundColor}) => {
    const [isExpanded, setExpanded] = useState(false); 
    const [activeItem, setActiveItem] = useState('');
    const navigate = useNavigate();
    const location = useLocation();  

    const toggleMenu = () => {
        setExpanded(!isExpanded);
    };

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/aluno/inicio') {
            setActiveItem('home');
        } 
        
        if (currentPath === '/aluno/cursos') {
            setActiveItem('courses');
        } 
        
        if (currentPath === '/aluno/instrucoes') {
            setActiveItem('instructions');
        } 
        
        if (currentPath === '/aluno/perfil') {
            setActiveItem('profileSettings');
        } 
        
        if (currentPath === '/aluno/certificados') {
            setActiveItem('certificates');
        } 
        
        if (currentPath === '/aluno/cursos-salvos') {
            setActiveItem('saved');
        }
    }, [location]);

    const handleNavigation = (item, route) => {
        setActiveItem(item);
        navigate(route);
    };

    const logout = () => {
        Swal.fire({
            title: "Confirmar saída",
            text: "Deseja sair de sua conta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B9D3B",
            cancelButtonColor: "#dadada",
            cancelTextColor: "#00000",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sair",
        }).then((result) => {

            if(result.value == true) {
                sessionStorage.clear();
                window.location.href = '/login';
            }
            
        
        });
    }

    return (
        <>
            <nav className={`${styles.SideBar} ${isExpanded ? styles.expanded : ''}`} style={{ backgroundColor }} aria-label="Menu de opções da plataforma">
                <div className={styles["menuIcon"]} onClick={toggleMenu}>
                    <MenuIcon sx={{ fontSize: 32, color: '#fff'}}/>
                </div>

                <div className={styles["menuOptions"]}>
                    <div className={styles["menuOptions__primary"]}>
                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('home', '/aluno/inicio')}>
                            <HomeIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'home' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Início</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('courses', '/aluno/cursos')}>
                            <SchoolIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'courses' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Cursos</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('instructions', '/aluno/instrucoes')}>
                            <InfoIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'instructions' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Ajuda</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('profileSettings', '/aluno/perfil')}>
                            <AccountCircleIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'profileSettings' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Seu perfil</span>}
                        </div>
                    </div>

                    <div className={styles["menuOptions__line"]}></div>

                    <div className={styles["menuOptions__secondary"]}>
                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('certificates', '/aluno/certificados')}>
                            <WorkspacePremiumIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'certificates' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Certificados</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('saved', '/aluno/cursos-salvos')}>
                            <BookmarkAddedIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'saved' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Matrículas</span>}
                        </div>
                    </div>
                </div>

                <div className={styles["menuIconLogout"]}>
                    <div className={styles["menuOptions__item"]} onClick={() => logout()}>
                        <LogoutIcon sx={{ fontSize: 32, color: '#fff'}}/>
                        {isExpanded && <span className={styles["menuOptions__item__text"]}>Sair</span>}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default SideBar;
