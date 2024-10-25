import React, { useState } from "react";
import './ButtonNovoCurso.css';
import SideBar from "../../componentes/SideBar/SideBar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdicionarModulos from "../Modulos/AdicionarModulos";

// esse componente é o início da criação do curso 
function ButtonNovoCurso({ onClose }) {

    const [curso, setCurso] = useState({
        titulo: '',
        descricao: '',
        imagem: null,
        modulos: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurso((prevCurso) => ({
            ...prevCurso,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setCurso((prevCurso) => ({
            ...prevCurso,
            imagem: e.target.files[0],
        }));
    };

    const handleAddModulo = (modulo) => { 
        setCurso((prevCurso) => ({
            ...prevCurso,
            modulos: [...prevCurso.modulos, modulo],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { titulo, descricao, categoria } = curso;

        if (!titulo || !descricao || !categoria) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }


        console.log(curso);
        alert('Curso criado com sucesso!');

        resetForm();
    };

    const resetForm = () => {
        setCurso({
            titulo: '',
            descricao: '',
            imagem: null,
            categoria: '',
            modulos: []

        });
    };

    return (
        <>
            <SideBar />
            <div className="form-container">
                <div className="form-header">
                    <h2>Criar Curso</h2>
                    <button className="btn-fechar" onClick={onClose}>
                        <CloseRoundedIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="form-cuso-criacao" >
                    <label>Título do Curso:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={curso.titulo}
                        onChange={handleInputChange}
                        placeholder="Digite o título do curso"
                        required
                        style={{width: '40%'}}
                    />

                    <label>Descrição do Curso:</label>
                    <textarea
                        name="descricao"
                        value={curso.descricao}
                        onChange={handleInputChange}
                        placeholder="Digite a descrição do curso"
                        required
                    />

                    <label>Imagem de Capa:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    />

                    <label>Categoria:</label>
                    <select
                        name="categoria"
                        value={curso.categoria}
                        onChange={handleInputChange}
                        required
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
                        className="btn-add-modulo"
                        onClick={() => handleAddModulo({titulo: '', descricao: ''})}
                    >
                        + Módulo
                    </button>

                    {curso.modulos.map((modulo, index) => (
                        <AdicionarModulos
                            key={index}
                            moduloIndex={index + 1}
                            AdicionarModulo={(novoModulo) => {
                                const modulosAtualizados = curso.modulos.map((m, i) =>
                                    i === index ? novoModulo : m
                                );
                                setCurso((prevCurso) => ({
                                    ...prevCurso,
                                    modulos: modulosAtualizados,
                                }));
                            }}
                        />
                    ))}

                    <button type="submit" className="btn-submit">Criar Curso</button>
                </form>
            </div>
        </>
    );
}

export default ButtonNovoCurso;
