import React, { useState } from "react";
import './ButtonNovoCurso.css';
import SideBar from "../../componentes/SideBar/SideBar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdicionarModulos from "../Modulos/AdicionarModulos";
import { toast } from 'react-toastify';
import api from "../../../api.js";

function ButtonNovoCurso({ curso, atualizarCurso, atualizarModulo, atualizarAula, atualizarPergunta, atualizarResposta, onClose }) {
    const handleCursoChange = (e) => {
        const { name, value } = e.target;
        if (name == "imagem") {
            atualizarCurso(name, e.target.files[0]);
        } else {
            atualizarCurso(name, value);
        }
    };

    const handleModuloAdd = () => {
        atualizarModulo(-1, '', '')
    };


    return (
        <>
            <SideBar />
            <div className="form-container">
                <div className="form-header">
                    <h2>Criar Curso</h2>
                    <button className="btn-remover" onClick={onClose}>
                        <CloseRoundedIcon />
                    </button>
                </div>
                <form
                    // onSubmit={handleSalvarCurso} 
                className="form-curso-criacao">
                    <label>Título do Curso<span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        name="titulo"
                        value={curso.titulo}
                        onChange={handleCursoChange}
                        placeholder="Digite o título do curso"
                        style={{ width: '40%' }}
                    />

                    <label>Descrição do Curso<span style={{ color: 'red' }}>*</span></label>
                    <input
                        name="descricao"
                        value={curso.descricao}
                        onChange={handleCursoChange}
                        placeholder="Digite a descrição do curso"
                        className="input-descricao"
                    />

                    <label>Imagem de Capa:</label>
                    <input
                        type="file"
                        name="imagem"
                        onChange={handleCursoChange}
                        accept="image/*"
                        className="file-imagem-capa"
                    />

                    <label>Categoria<span style={{ color: 'red' }}>*</span></label>
                    <select
                        name="categoria"
                        value={curso.categoria}
                        onChange={handleCursoChange}
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
                        onClick={handleModuloAdd}
                    >
                        + Módulo
                    </button>

                    {curso.modulos.map((modulo, index) => (
                        <AdicionarModulos
                            key={index}
                            moduloIndex={index}
                            modulo={modulo}
                            atualizarModulo={atualizarModulo}
                            atualizarAula={atualizarAula}
                            atualizarPergunta={atualizarPergunta}
                            atualizarResposta={atualizarResposta}
                            // removerModulo=
                        />
                    ))}

                    <button type="submit" className="btn-submit">Salvar Curso</button>
                </form>
            </div>
        </>
    );
}

export default ButtonNovoCurso;