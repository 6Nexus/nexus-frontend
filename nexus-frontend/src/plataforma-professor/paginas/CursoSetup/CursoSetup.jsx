import React, { useState } from "react";
import './CursoSetup.css';
import SideBar from "../../componentes/SideBar/SideBar";
import ButtonNovoCurso from "../../componentes/ButtonNovoCurso/ButtonNovoCurso";
import Swal from 'sweetalert2';


function CursoSetup() {
    const [mostrarCriarCurso, setMostrarCriarCurso] = useState(false);
    const [curso, setCurso] = useState({
        titulo: '',
        descricao: '',
        imagem: null,
        categoria: '',
        modulos: [],

    }); 

    const abrirCriadorCurso = () => {
        setMostrarCriarCurso(true);
    };

    const fecharCriadorCurso = () => {
        setMostrarCriarCurso(false);
    };


    const atualizarCurso = (novosDados) => {
        setCurso((cursoAtual) => ({
            ...cursoAtual,
            ...novosDados
        }));
    };

    // Função para salvar o curso 
    // ainda vai ser passado os propriedades para salvar módulos e aulas
    

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
                            curso={curso}
                            atualizarCurso={atualizarCurso}
                            onClose={fecharCriadorCurso}
                            // onSave={salvarCurso}
                        /> 
                    )}
                </div>
            </div>
        </>
    );
}

export default CursoSetup;
