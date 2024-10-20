import React, { useState } from "react";
import './ButtonNovoCurso.css';
import SideBar from "../../componentes/SideBar/SideBar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// esse componente é o inicio da criação do curso 
function ButtonNovoCurso({ onClose }) {

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState(null);
    const [categoria, setCategoria] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!titulo || !descricao || !categoria) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        
        const curso = {
            titulo,
            descricao,
            imagem,
            categoria,
            // incluir módulos e aulas
        };

        console.log(curso); 
        alert('Curso criado com sucesso!');
        
        
        resetForm();
    };

    
    const resetForm = () => {
        setTitulo('');
        setDescricao('');
        setImagem(null);
        setCategoria('');
    };

    return (
        <>
            <SideBar />
            <div className="form-container">
                <div className="form-header">
                    <h2>Criar Curso</h2>
                    <button className="btn-fechar" onClick={onClose}><CloseRoundedIcon/></button> {/* Botão "X" para fechar */}
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Título do Curso:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Digite o título do curso"
                        required
                    />
                  
                    <label>Descrição do Curso:</label>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Digite a descrição do curso"
                        required
                    />

                    <label>Imagem de Capa</label>
                    <input
                        type="file"
                        onChange={(e) => setImagem(e.target.files[0])}
                        accept="image/*"
                    />

                    <label>Categoria:</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
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

                    <button type="submit" className="btn-submit">Criar Curso</button>
                    {/* esse botao vai ser removido e adicionado no componente pai CursoSetup para garantir que salve o curso com módulos e aulas*/}
                </form>
            </div>
        </>
    );
}

export default ButtonNovoCurso;
