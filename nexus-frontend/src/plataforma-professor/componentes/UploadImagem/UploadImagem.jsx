import React from "react";
import './UploadImagem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import fotoPerfil from "../../../utils/assets/foto-perfil.png"

function UploadImagem (){

    return (
        <>
            
            <div class="container-imagem">
                <input type="file" id="file-imagem" accept="image/*" />
                <div className="select-img">
                    <FontAwesomeIcon icon={faCloudArrowUp} className="icon-upload" />
                    <span>Carregar imagem</span>
                    {/* <img src={fotoPerfil} alt="foto de perfil" /> */}
                </div>
                <button className="btn-selecionar-img"> 
                    Selecione uma imagem 
                </button>
            </div>
        </>
    )

}
export default UploadImagem;