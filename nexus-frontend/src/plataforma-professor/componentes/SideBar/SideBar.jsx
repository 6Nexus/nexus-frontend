import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideBar.css';
import logoMaes from "../../../utils/assets/logo-maes-branca.png"
import iconeMaes from "../../../utils/assets/iconeMaesLuta.png"

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

const SideBar = ({ backgroundColor }) => {
    const [isExpanded, setExpanded] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setExpanded(!isExpanded);
    };

    const handleNavigation = (item, route) => {
        setActiveItem(item);
        navigate(route);
    };

    const menuItems = [
        { icon: <VideoSettingsIcon sx={{ fontSize: 30 }} />, name: 'Inicio', route: '/curso-setup' },
        { icon: <PlayLessonIcon sx={{ fontSize: 30 }} />, name: 'Cursos', route: '/meus-cursos' },
        { icon: <AccountCircleIcon sx={{ fontSize: 30 }} />, name: 'Perfil', route: '/perfil-professor' },
        { icon: <HelpIcon sx={{ fontSize: 30 }} />, name: 'Ajuda', route: '/ajuda' },

    ];

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/curso-setup') {
            setActiveItem('Inicio');
        }
        else if (currentPath === '/meus-cursos') {
            setActiveItem('Cursos');
        }
        else if (currentPath === '/perfil-professor') {
            setActiveItem('Perfil'); 
        }
        else if (currentPath === '/ajuda') {
            setActiveItem('Ajuda');
        }
    }, [location]);

    return (
        <>
            <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`} style={{ backgroundColor }}>
                <div onClick={toggleMenu} className="toggle-button">
                    <MenuRoundedIcon className='menu-icon' sx={{ fontSize: 32, color: '#fff' }} />
                </div>

                
                {isExpanded && (
                    <div className="sidebar-logo">
                        <img src={logoMaes} alt="Logo" className="logo-maes" />
                    </div>
                )}

                {!isExpanded && (
                    <div className='sidebar-logo'>
                        <img src={logoMaes} alt="icone maes" style={{width: '90'}} />
                    </div>
                )}
                    
        
                <div className='line'></div>
               


                <ul className="menu">
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={`menu-item ${activeItem === item.name ? 'active' : ''}`}
                            onClick={() => handleNavigation(item.name, item.route)} >

                            <span className='icons'>{item.icon}</span>
                            {isExpanded && <span className='item-name'>{item.name}</span>}

                        </li>
                    ))}
                </ul>

                <div className='icon-logout' onClick={() => handleNavigation('Sair', '/login-professor')}>
                    <span className='icons'>{isExpanded ? <LogoutIcon sx={{ fontSize: 30 }} /> : <LogoutIcon sx={{ fontSize: 30 }} />}</span>
                    {isExpanded && <span className='item-name'>Sair</span>}
                </div>
            </div>

        </>
    );
};

export default SideBar;
