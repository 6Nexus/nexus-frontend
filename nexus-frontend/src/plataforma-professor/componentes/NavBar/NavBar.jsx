import React, {useState} from "react";
import { useNavigate} from 'react-router-dom';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../SideBar/SideBar"




function NavBar() {

    const [activeItem, setActiveItem] = useState('');
    const navigate = useNavigate();

    const handleNavigation = (item, route) => {
        setActiveItem(item);
        navigate(route);
    };


    return (
        <>
            <header>
                <span>Meu Perfil</span>
                <nav>
                    <button className="icon-sair" onClick={() => handleNavigation('', '/curso-setup')}>
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                </nav>
            </header>
        </>
    )
}
export default NavBar;