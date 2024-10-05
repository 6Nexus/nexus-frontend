import React from "react";
import './Perfil.css';
import NavBar from "../../componentes/NavBar/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import fotoPerfil from "../../../utils/assets/foto-perfil.png"
import UploadImagem from "../../componentes/UploadImagem/UploadImagem";



function Perfil() {

    return (
        <div>
            <NavBar />
            <UploadImagem/>
        </div>
    )
}
export default Perfil;