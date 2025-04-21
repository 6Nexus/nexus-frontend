import React, { useState, useEffect} from "react";
import './CursoSetup.css';
import SideBar from "../../componentes/SideBar/SideBar";
import ButtonNovoCurso from "../../componentes/ButtonNovoCurso/ButtonNovoCurso";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

function CursoSetup() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!(sessionStorage.getItem('userId'))){
            // console.log("sem id")
            toast.error('Usuario não autenticado')
            navigate('/login-professor')
        }
    }, []); 

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
