import React, { useState, useEffect } from "react";
import './MeusCursos.css';
import SideBar from "../../componentes/SideBar/SideBar";
import ButtonNovoCurso from "../../componentes/ButtonNovoCurso/ButtonNovoCurso"
import imagemCapa from '../../../utils/assets/capa_curso.jpg';
import api from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function MeusCursos() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!(sessionStorage.getItem('userId'))){
            // console.log("sem id")
            navigate('/login-professor')
        }
    }, []); 
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editando, setEditando] = useState(false); // Controla se estamos editando um curso
    const [cursoSelecionado, setCursoSelecionado] = useState(null); // Dados do curso selecionado para edição
    const idProfessor = sessionStorage.getItem('userId'); 
    


    useEffect(() => {
        const buscarCursos = async () => {
            try {
                const response = await api.get(`/cursos/professor/${idProfessor}`);
                if (response.status === 200) {
                    setCursos(response.data); 
                } 
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        buscarCursos();
    }, []);


    if (loading) {
        return (
            <div className="carregando">
                <SideBar backgroundColor={'#94065E'} />
                <div className="loader"></div>
            </div>
        )
    }

    const handleEditarCurso = (curso) => {
        setCursoSelecionado({ ...curso, modulos: [] });
        setEditando(true);
    };

    const handleFecharEdicao = () => {
        setEditando(false);
    };


    const deletarCurso = async (idCurso) => {
        try {
            const response = await api.delete(`/cursos/${idCurso}`);
            if (response.status === 204) {

                setCursos(cursos.filter(curso => curso.id !== idCurso));
                toast.success('Curso deletado com sucesso!')
            } else {
                console.error("Falha ao deletar o curso");
            }
        } catch (error) {
            console.error('Erro ao deletar o curso', error);
            toast.error('Erro ao exlcuir o curso, tente novamente mais tarde')
        }
    };

    return (
        <>
            <SideBar backgroundColor={'#94065E'} />
            <div className="header-cursos-criados">
                <p className="title-cursos">Cursos Criados</p>
            </div>
            <div className="cursos-criados">
                {cursos.map((curso, index) => (
                    <div className="curso-criados-info" key={index}>
                        <div className="img-capa">
                            <img src={curso.capaUrl || imagemCapa} alt={`Imagem do ${curso.titulo}`} />
                        </div>
                        <div className="info-cards">
                            <h2>{curso.titulo}</h2>
                            <p>{curso.categoria}</p>
                            <div className="button-editar-curso">
                                <button onClick={() => handleEditarCurso(curso)}>Editar</button>
                                <button
                                    onClick={() => deletarCurso(curso.id)}
                                    style={{ backgroundColor: '#9e2a2b' }}
                                > Deletar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {editando && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ButtonNovoCurso
                            onClose={handleFecharEdicao}
                            cursoAEditar={cursoSelecionado}
                            // onCursoEditado={handleSalvarEdicao}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default MeusCursos;
