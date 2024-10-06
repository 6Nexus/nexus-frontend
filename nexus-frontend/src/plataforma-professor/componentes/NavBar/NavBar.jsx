import React from "react";
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHome } from "@fortawesome/free-solid-svg-icons";




function NavBar() {
    return (
        <>
            <header>
                <span>Meu Perfil</span>
                <nav>
                    <button className="icon-sair">
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                </nav>
            </header>
        </>
    )
}
export default NavBar;