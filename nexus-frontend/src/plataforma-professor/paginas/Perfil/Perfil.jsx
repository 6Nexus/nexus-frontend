import React from "react";
import './Perfil.css';
import NavBar from "../../componentes/NavBar/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UploadImagem from "../../componentes/UploadImagem/UploadImagem";



function Perfil() {

    return (
        <div>
            <NavBar />
            <div className="container-geral">
                <div className="upload-imagem">
                    <UploadImagem />
                </div>
                <div className="container-info">
                    <div className="infos">
                        <h4>Minha Informações</h4>
                        <span>Nome</span>
                        <span>Sobrenome</span>
                        <span>Email</span>
                    </div>
                    <div className="btn-editar-info">
                        <button>Editar</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Perfil;