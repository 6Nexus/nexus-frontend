import * as React from "react";
import { useState, useEffect } from "react";
import styles from './SideBar.module.css';

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const SideBar = ({ backgroundColor }) => {
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

    const handleDownload = async () => {
        try {
            const response = await axios.get('http://localhost:8080/administradores/csv', {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'blob', // Indica que a resposta será um arquivo binário
            });

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const fileName = `relatorio-${day}-${month}-${year}-${hours}-${minutes}-${seconds}.csv`;


            // Cria uma URL temporária para o arquivo e força o download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Nome do arquivo baixado
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link); // Remove o link do DOM
        } catch (error) {
            console.error('Erro ao baixar o arquivo:', error);
        }
    };

    return (
        <>
            <nav className={`${styles.SideBar} ${isExpanded ? styles.expanded : ''}`} style={{ backgroundColor }} aria-label="Menu de opções da plataforma">
                <div className={styles["menuIcon"]} onClick={toggleMenu}>
                    <MenuIcon sx={{ fontSize: 32, color: '#fff' }} />
                </div>

                <div className={styles["menuOptions"]}>
                    <div className={styles["menuOptions__primary"]}>
                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('professor', '/admin/professores')}>
                            <PersonIcon sx={{ fontSize: 32, color: '#fff' }} className={`${activeItem === 'professor' ? styles["active"] : ""}`} />
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Professor</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('aluno', '/admin/maes')}>
                            <Groups2RoundedIcon sx={{ fontSize: 32, color: '#fff' }} className={`${activeItem === 'aluno' ? styles["active"] : ""}`} />
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Mães</span>}
                        </div>

                        <div className={styles["menuOptions__item"]} onClick={() => handleNavigation('curso', '/admin/cursos')}>
                            <SchoolIcon sx={{ fontSize: 32, color: '#fff' }} className={`${activeItem === 'curso' ? styles["active"] : ""}`} />
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Cursos</span>}
                        </div>
                    </div>

                    <div className={styles["menuOptions__line"]}></div>

                    <div className={styles["menuOptions__secondary"]}>
                        <div className={styles["menuOptions__item"]} onClick={handleDownload}>
                            <UploadFileIcon sx={{ fontSize: 32, color: '#fff' }} className={`${activeItem === 'metrica' ? styles["active"] : ""}`} />
                            {isExpanded && <span className={styles["menuOptions__item__text"]}>Métricas</span>}
                        </div>
                    </div>
                </div>

                <div className={styles["menuIconLogout"]}>
                    <div className={styles["menuOptions__item"]}>
                        <LogoutIcon sx={{ fontSize: 32, color: '#fff' }} />
                        {isExpanded && <span className={styles["menuOptions__item__text"]}>Sair</span>}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default SideBar;
