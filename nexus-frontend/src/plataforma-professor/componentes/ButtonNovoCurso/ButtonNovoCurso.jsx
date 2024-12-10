import React, { useState, useEffect } from "react";
import './ButtonNovoCurso.css';
import SideBar from "../../componentes/SideBar/SideBar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdicionarModulos from "../Modulos/AdicionarModulos";
import { toast } from 'react-toastify';
import api from "../../../api.js";

function ButtonNovoCurso({ onClose, idCurso, isEditando, cursoExistente }) {
    const [curso, setCurso] = useState({
        titulo: '',
        descricao: '',
        // imagem: null,
        categoria: '',
        idProfessor: Number(sessionStorage.getItem('userId'))
        // modulos: [] 
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurso((prevCurso) => ({
            ...prevCurso,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setCurso((prevCurso) => ({
            ...prevCurso,
            imagem: e.target.files[0],
        }));
    };

    // const handleAddModulo = () => {
    //     setCurso((prevCurso) => ({
    //         ...prevCurso,
    //         modulos: [...prevCurso.modulos, { titulo: '', descricao: '', aulas: [], questionario: [] }],
    //     }));
    // };

    // separando o modulo do objeto de curso
   const [modulos, setModulos] = useState([]);

    const handleAddModulo = () => {
        setModulos((prevModulos) => [
            ...prevModulos,
            { titulo: '', idCurso: curso.id, ordem: prevModulos.length + 1},
        ]);
    };

    const handleAtualizarModulo = (index, updatedModulo) => {
        setModulos((prevModulos) =>
            prevModulos.map((modulo, i) => (i === index ? updatedModulo : modulo))
        );
    };



    useEffect(() => {
        const carregarCurso = async () => {
            try {
                if (idCurso) {
                    const response = await api.get(`/cursos/${idCurso}`);
                    if (response.status === 200) {
                        setCurso(response.data); // Preenche os dados do curso
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar curso:', error);
                toast.error('Erro ao carregar o curso.');
            }
        };

        carregarCurso();
    }, [idCurso]);

    useEffect(() => {
        if (cursoExistente) {
            setCurso(cursoExistente); // Preenche os dados do curso para edição
        }
    }, [cursoExistente]);
    
    idCurso = cursoExistente?.id; // Obtem o ID do curso para atualizar
    

    const handleSalvarCurso = async (e) => {
        e.preventDefault();
        try {
            if (idCurso) {
                // Atualiza o curso
                await api.patch(`/cursos/titulo/${idCurso}/${curso.titulo}`);
                await api.patch(`/cursos/categoria/${idCurso}/${curso.categoria}`);
                await api.patch(`/cursos/descricao/${idCurso}/${curso.descricao}`);
                toast.success('Curso atualizado com sucesso!');
            } else {
                // Cria um novo curso
                const response = await api.post('/cursos', curso);
                if (response.status === 201) {
                    toast.success('Curso criado com sucesso!'); 
                }
            }
            onClose();
        } catch (error) {
            console.error('Erro ao salvar curso:', error);
            toast.error('Erro ao salvar o curso.');
        }
    };

    // const resetForm = () => {
    //     setCurso({
    //         titulo: '',
    //         descricao: '',
    //         // imagem: null,
    //         categoria: '',
    //         // modulos: []
    //     });
    // };

    return (
        <>
            <SideBar />
            <div className="form-container">
                <div className="form-header">
                    <h2>{isEditando ? "Atualizar Curso" : "Criar Curso"}</h2>
                    <button className="btn-remover" onClick={onClose}>
                        <CloseRoundedIcon />
                    </button>
                </div>
                <form onSubmit={handleSalvarCurso} className="form-curso-criacao">
                    <label>Título do Curso<span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        name="titulo"
                        value={curso.titulo}
                        onChange={handleInputChange}
                        placeholder="Digite o título do curso"
                        // required
                        style={{ width: '40%' }}
                    />

                    <label>Descrição do Curso<span style={{ color: 'red' }}>*</span></label>
                    <input
                        name="descricao"
                        value={curso.descricao}
                        onChange={handleInputChange}
                        placeholder="Digite a descrição do curso"
                        // required
                        className="input-descricao"
                    />

                    <label>Imagem de Capa:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="file-imagem-capa"
                    />

                    <label>Categoria<span style={{ color: 'red' }}>*</span></label>
                    <select
                        name="categoria"
                        value={curso.categoria}
                        onChange={handleInputChange}
                    // required
                    >
                        <option value="">Selecione uma categoria</option>
                        <option value="Cidadania">Cidadania</option>
                        <option value="Autocuidado">Autocuidado</option>
                        <option value="Culinária">Culinária</option>
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Idiomas">Idiomas</option>
                        <option value="Artes">Artes</option>
                        <option value="Empreendedorismo">Empreendedorismo</option>
                    </select>

                    <button
                        type="button"
                        className="btn-add-modulo"
                        onClick={handleAddModulo}
                    >
                        + Módulo
                    </button>

                    {modulos.map((modulo, index) => (
                        <AdicionarModulos
                            key={index}
                            moduloIndex={index}
                            modulo={modulo}
                            atualizarModulo={handleAtualizarModulo}
                            removerModulo={() => {
                                setModulos((prevModulos) => prevModulos.filter((_, i) => i !== index));
                            }}
                        />
                    ))}

                    <button type="submit" className="btn-submit">{isEditando ? "Atualizar Curso" : "Salvar Curso"}</button>
                </form>
            </div>
        </>
    );
}

export default ButtonNovoCurso;