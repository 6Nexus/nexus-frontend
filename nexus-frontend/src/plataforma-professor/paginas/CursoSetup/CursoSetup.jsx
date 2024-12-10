import React, { useState, useEffect } from "react";
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
        modulos: []
    }); 

    const atualizarCurso = (campo, valor) => {
        setCurso((prevCurso) => ({
            ...prevCurso,
            [campo]: valor
        }));
    };

    const atualizarModulo = (indexModulo, campo, valor) => {
        setCurso((prevCurso) => {
            const novosModulos = [...prevCurso.modulos];

            if (indexModulo === -1) {
                novosModulos.push({ ordem: 0, titulo: '', descricao: '', aulas: [], questionario: [] });
            } else {
                novosModulos[indexModulo] = {
                    ...novosModulos[indexModulo],
                    [campo]: valor
                };
            }

            return {
                ...prevCurso,
                modulos: novosModulos
            };
        });
    };

    const atualizarAula = (indexModulo, indexAula, campo, valor) => {
        setCurso((prevCurso) => {
            const novosModulos = [...prevCurso.modulos];

            if (indexAula === -1) {
                novosModulos[indexModulo].aulas.push({ ordem: 0, titulo: '', descricao: '', video: '' });
            } else {
                novosModulos[indexModulo].aulas[indexAula] = {
                    ...novosModulos[indexModulo].aulas[indexAula],
                    [campo]: valor
                };
            }

            return {
                ...prevCurso,
                modulos: novosModulos
            };
        });
    };

    useEffect(() => {
        console.log("Estado atualizado:", curso);
    }, [curso]);

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
                            key={curso.id}
                            curso={curso}
                            atualizarCurso={atualizarCurso}
                            atualizarModulo={atualizarModulo}
                            atualizarAula={atualizarAula}
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
