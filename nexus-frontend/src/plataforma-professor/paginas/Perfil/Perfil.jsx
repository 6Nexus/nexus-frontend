import React from "react";
import './Perfil.css';
import NavBar from "../../componentes/NavBar/NavBar";
import UploadImagem from "../../componentes/UploadImagem/UploadImagem";
import SideBar from "../../componentes/SideBar/SideBar";


function Perfil() {

    return (
        <>

            <SideBar backgroundColor={'#94065E'} />
            <div>
                <div className="container-geral"> 
                        <div className="upload-imagem">
                            <UploadImagem />
                        </div>
                    <div className="container-info">
                        <div className="infos">
                            <h4>Informações Pessoais</h4>
                            <label>Nome</label>
                            <input type="text" />
                            <label>Sobrenome</label>
                            <input type="text" />
                            <label>CPF</label>
                            <input type="text" />
                            <label>Área de atuação</label>
                            <input type="text" />
                            <label>Email</label>
                            <input type="text" />                         
                        </div>
                        <div className="btn-editar-info">
                            <button>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Perfil;