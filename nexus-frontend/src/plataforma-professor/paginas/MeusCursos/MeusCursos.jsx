import React, { useState, useEffect } from "react";
import './MeusCursos.css';
import SideBar from "../../componentes/SideBar/SideBar";
import ButtonNovoCurso from "../../componentes/ButtonNovoCurso/ButtonNovoCurso"
import imagemCapa from '../../../utils/assets/imagem-card-teste.png';
import api from "../../../api";

function MeusCursos() {
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

    const handleEditarCurso = async (idCurso) => {
        try {
            const response = await api.get(`/cursos/${idCurso}`);
            if (response.status === 200) {
                setCursoSelecionado(response.data);
                setEditando(true);
            }
        } catch (error) {
            console.error('Erro ao buscar curso:', error);
        }
    };

    const handleFecharEdicao = () => {
        setEditando(false);
        // setCursoSelecionado(null); 
    };

    if (loading) {
        return (
            <div className="carregando">
                <SideBar backgroundColor={'#94065E'} />
                <div className="loader"></div>
            </div>
        );
    }

    const handleSalvarEdicao = (cursoEditado) => {
        setCursos((prevCursos) => 
            prevCursos.map((curso) => 
                curso.id === cursoEditado.id ? cursoEditado : curso
            )
        );
        setEditando(false);
    };
    

    return (
        <>
            <SideBar backgroundColor={'#94065E'} />
            <div className="header-cursos-criados">
                <p className="title-cursos">Cursos criados</p>
            </div>
            <div className="cursos-criados">
                {cursos.map((curso) => (
                    <div className="curso-criados-info" key={curso.id}>
                        <div className="img-capa">
                            <img src={imagemCapa} alt={`Imagem do ${curso.titulo}`} />
                        </div>
                        <div className="info-cards">
                            <h2>{curso.titulo}</h2>
                            <p>{curso.categoria}</p>
                        </div>
                        <div className="button-editar-curso">
                            <button onClick={() => handleEditarCurso(curso.id)}>Editar</button>
                        </div>
                    </div>
                ))}
            </div>

            {editando && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ButtonNovoCurso
                            onClose={handleFecharEdicao}
                            cursoExistente={cursoSelecionado}
                            isEditando={true}
                            onCursoEditado={handleSalvarEdicao}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default MeusCursos;
