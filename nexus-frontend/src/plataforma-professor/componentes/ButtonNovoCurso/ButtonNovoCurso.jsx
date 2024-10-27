import React, { useState } from "react";
import './ButtonNovoCurso.css';
import SideBar from "../../componentes/SideBar/SideBar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdicionarModulos from "../Modulos/AdicionarModulos";

function ButtonNovoCurso({ onClose }) {
    const [curso, setCurso] = useState({
        titulo: '',
        descricao: '',
        imagem: null,
        categoria: '',
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

    const handleAddModulo = () => {
        setCurso((prevCurso) => ({
            ...prevCurso,
            modulos: [...prevCurso.modulos, { titulo: '', descricao: '', aulas: [] }],
        }));
    };

    const handleSalvarCurso = (e) => {
        e.preventDefault();
        const { titulo, descricao, categoria } = curso;

        if (!titulo || !descricao || !categoria) {
            alert('Por favor, preencha todos os campos obrigatórios!')
            return;
        }

        if(curso.modulos.length === 0){
            alert('Por favor, adicione pelo menos um módulo ao curso!')
            return;
        }

        let arrayModulos = curso.modulos
        
        for (let i = 0; i < arrayModulos.length; i++) {
           
            if (arrayModulos[i].aulas.length === 0) {
                alert(`O módulo ${i + 1} não possui aulas. Por favor, adicione pelo menos uma aula.`);
                return; 
            }
            
            
            if (!arrayModulos[i].titulo || !arrayModulos[i].descricao) {
                alert(`Por favor, preencha todos os campos do módulo ${i + 1}.`);
                return; 
            }
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
                <form onSubmit={handleSalvarCurso} className="form-curso-criacao">
                    <label>Título do Curso:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={curso.titulo}
                        onChange={handleInputChange}
                        placeholder="Digite o título do curso"
                        // required
                        style={{ width: '40%' }}
                    />

                    <label>Descrição do Curso:</label>
                    <textarea
                        name="descricao"
                        value={curso.descricao}
                        onChange={handleInputChange}
                        placeholder="Digite a descrição do curso"
                        // required
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
                            removerModulo={() => {
                                const modulosAtualizados = curso.modulos.filter((_, i) => i !== index);
                                setCurso((prevCurso) => ({
                                    ...prevCurso,
                                    modulos: modulosAtualizados,
                                }));
                            }}
                        />
                    ))}

                    <button type="submit" className="btn-submit">Salvar Curso</button>
                </form>
            </div>
        </>
    );
}

export default ButtonNovoCurso;