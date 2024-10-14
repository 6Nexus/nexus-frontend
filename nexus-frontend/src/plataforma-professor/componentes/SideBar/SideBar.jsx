import React from "react";
import './SideBar.css';
import logoMaesEmLuta from "../../../utils/assets/logo-maes-branca.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
    return (
        <>
            <div className="minha-div">
                    <div className="div1">
                            <div className="logo-mae">
                                <img src={logoMaesEmLuta}/>
                            </div>
                    </div>
            </div>
        </>
    )
}
export default SideBar; 