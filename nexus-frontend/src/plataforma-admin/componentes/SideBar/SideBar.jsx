import * as React from "react";
import { useState } from "react";
import styles from './SideBar.module.css';

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadFileIcon from '@mui/icons-material/UploadFile';


import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const SideBar = ({backgroundColor}) => {
    const [isExpanded, setExpanded] = useState(false);
    const [activeItem, setActiveItem] = useState('/admin/professores');
    const navigate = useNavigate();
    const location = useLocation();  

    const toggleMenu = () => {
        setExpanded(!isExpanded);
    };

    useEffect(() => {
        const currentPath = location.pathname;
       
        
        if (currentPath === '/admin/professores') {
            setActiveItem('professor');
        } 
        
        if (currentPath === '/admin/maes') {
            setActiveItem('aluno');
        } 

        if (currentPath === '/admin/cursos') {
            setActiveItem('curso');
        } 

    }, [location]);

    const handleNavigation = (item, route) => {
        setActiveItem(item);
        navigate(route);
    };

    return (
        <>
            <nav className={`${styles.SideBar} ${isExpanded ? styles.expanded : ''}`} style={{ backgroundColor }} aria-label="Menu de opções da plataforma">
                <div className={styles["menuIcon"]} onClick={toggleMenu}>
                    <MenuIcon sx={{ fontSize: 32, color: '#fff'}}/>
                </div>

                <div className={styles["menuOptions"]}>
                    <div className={styles["menuOptions__primary"]}>
                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('professor', '/admin/professores')}>
                            <PersonIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'professor' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Professor</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('aluno', '/admin/maes')}>
                            <Groups2RoundedIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'aluno' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Mães</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('curso', '/admin/cursos')}>
                            <SchoolIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'curso' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Cursos</span>}
                        </div>

                    </div>

                    <div className={styles["menuOptions__line"]}></div>

                    <div className={styles["menuOptions__secondary"]}>
                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('', '/')}>
                            <UploadFileIcon sx={{ fontSize: 32, color: '#fff'}} className={`${activeItem === 'metrica' ? styles["active"] : ""}`}/>
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Métricas</span>}
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

export default SideBar;