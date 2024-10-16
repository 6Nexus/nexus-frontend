import React, { useState } from 'react';
import styles from './NavBar.module.css';
import logo from '../../../utils/assets/logo.png';
import SchoolIcon from '@mui/icons-material/School';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DehazeIcon from '@mui/icons-material/Dehaze';

function NavBar({ onProfessorClick, onAlunoClick, onCursoClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav>
            {/* Navbar superior */}
            <div className={styles["navbar-top"]}>
                <div className={styles["elementos-navtop"]}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                    <div className={styles["admin-title"]}>Administrador</div>
                </div>
                
            </div>

            <div className={`${styles["navbar-side"]} ${isOpen ? styles.open : styles.closed}`}>
                <div className={styles["logout-container"]} id="toggle-btn" onClick={toggleNavBar}>
                    <DehazeIcon fontSize="large" className={styles.icon} />
                </div>

                <div className={styles["nav-items"]}>
                    <div className={styles["icones-titulos"]}>
                        <PersonIcon fontSize="large" className={styles.icon} />
                        {isOpen && (
                            <p onClick={onProfessorClick} className={styles["nav-item"]}>
                                Professores
                            </p>
                            )}
                    </div>

                    <div className={styles["icones-titulos"]}>
                        <Groups2RoundedIcon fontSize="large" className={styles.icon} />
                        {isOpen && (
                            <p onClick={onAlunoClick} className={styles["nav-item"]}>
                                Mães
                            </p>
                        )}
                    </div>

                    <div className={styles["icones-titulos"]}>
                        <SchoolIcon fontSize="large" className={styles.icon} />
                        {isOpen && (
                            <p onClick={onCursoClick} className={styles["nav-item"]}>
                                Cursos
                            </p>
                        )}
                    </div>
                </div>

                <div className={styles["logout-container"]}>
                    <LogoutIcon fontSize="large" className={styles.icon} />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;