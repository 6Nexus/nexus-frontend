import React from "react";
import './Perfil.css';
import NavBar from "../../componentes/NavBar/NavBar";
import UploadImagem from "../../componentes/UploadImagem/UploadImagem";
import SideBar from "../../componentes/SideBar/SideBar";


function Perfil() {

    return (
        <>
        
        <SideBar backgroundColor={'#94065E'}/>
        <div>
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
        </>

    )
}
export default Perfil;