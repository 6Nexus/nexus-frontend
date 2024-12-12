import React, { useState } from "react";
import './CursoSetup.css';
import SideBar from "../../componentes/SideBar/SideBar";
import ButtonNovoCurso from "../../componentes/ButtonNovoCurso/ButtonNovoCurso";
import Swal from 'sweetalert2';

function CursoSetup() {
    const [mostrarCriarCurso, setMostrarCriarCurso] = useState(false);

    const abrirCriadorCurso = () => {
        setMostrarCriarCurso(true);
    };

    const fecharCriadorCurso = () => {
        setMostrarCriarCurso(false);
    };

    return (
        <>
            <SideBar />
            <div className="container-criar-curso">
                <div className="container-curso">

                    <button onClick={abrirCriadorCurso} className="btn-novo-curso">
                        + Novo Curso
                    </button>

                    {mostrarCriarCurso && (
                        <ButtonNovoCurso
                            onClose={fecharCriadorCurso}
                        /> 
                    )}
                </div>
            </div>
        </>
    );
}

export default CursoSetup;
