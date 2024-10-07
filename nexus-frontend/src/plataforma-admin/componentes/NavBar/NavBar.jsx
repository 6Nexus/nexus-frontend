import React, { useState } from 'react';
import styles from './NavBar.module.css';

function NavBar({ logoInicio, onProfessorClick, onAlunoClick, onCursoClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav>
            {/* Navbar superior */}
            <div className={styles["navbar-top"]}>
                <button id="toggle-btn" onClick={toggleNavBar}>
                    ☰
                </button>
                <div className={styles["admin-title"]}>Administrador</div>
            </div>

            {/* Navbar lateral */}
            <div className={`${styles["navbar-side"]} ${isOpen ? styles.open : ''}`}>
                <img src={logoInicio} alt="Logo" className={styles.logo} />
                <p onClick={onProfessorClick} className={styles["nav-item"]}>Professores</p>
                <p onClick={onAlunoClick} className={styles["nav-item"]}>Alunos</p>
                <p onClick={onCursoClick} className={styles["nav-item"]}>Cursos</p>
            </div>
        </nav>
    );
}

export default NavBar;