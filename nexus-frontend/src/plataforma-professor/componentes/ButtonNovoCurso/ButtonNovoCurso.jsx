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
            [name]: value 
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
            modulos: [...prevCurso.modulos, { titulo: '', descricao: '', aulas: [], questionario: [] }],
        }));
    };

    const handleSalvarCurso = (e) => {
        e.preventDefault();
        const { titulo, descricao, categoria, modulos } = curso;

        // Verificações iniciais
        if (!titulo || !descricao || !categoria) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        if (modulos.length === 0) {
            alert('Por favor, adicione pelo menos um módulo ao curso!');
            return;
        }

        // Log para verificar o estado dos módulos
        console.log("Módulos no momento da validação:", modulos);

        // Validação dos módulos
        for (let i = 0; i < modulos.length; i++) {
            console.log("Validando módulo:", modulos[i]); // Log do módulo atual
            if (!modulos[i].titulo || !modulos[i].descricao) {
                alert(`Por favor, preencha todos os campos do módulo ${i + 1}`);
                return;
            }

            // Verificação das aulas
            if (modulos[i].aulas.length === 0) {
                alert(`O módulo ${i + 1} não possui aulas. Por favor, adicione pelo menos uma aula!`);
                return;
            }

            for (let j = 0; j < modulos[i].aulas.length; j++) {
                console.log("Validando aula:", modulos[i].aulas[j]); // Log da aula atual
                if (!modulos[i].aulas[j].titulo || !modulos[i].aulas[j].descricao) {
                    alert(`Por favor, preencha todos os campos da aula ${j + 1} no módulo ${i + 1}`);
                    return;
                }
            }

            // Verificação do questionário
            if (modulos[i].questionario.length === 0) {
                alert(`O módulo ${i + 1} não possui questões no questionário. Por favor, adicione pelo menos uma questão!`);
                return;
            }

            for (const questao of modulos[i].questionario) {
                if (!questao.texto || questao.alternativas.length === 0) {
                    alert(`A questão "${questao.texto}" do módulo ${i + 1} precisa de pelo menos uma alternativa!`);
                    return;
                }
                const alternativaCorreta = questao.alternativas.find(alt => alt.correta);
                if (!alternativaCorreta) {
                    alert(`A questão "${questao.texto}" do módulo ${i + 1} precisa de uma alternativa correta!`);
                    return;
                }
            }
        }

        console.log('Curso Criado', curso); // Aqui você pode implementar a lógica de envio do curso para o backend
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
                    <button className="btn-remover" onClick={onClose}>
                        <CloseRoundedIcon />
                    </button>
                </div>
                <form onSubmit={handleSalvarCurso} className="form-curso-criacao">
                    <label>Título do Curso<span style={{color: 'red'}}>*</span></label>
                    <input
                        type="text"
                        name="titulo"
                        value={curso.titulo}
                        onChange={handleInputChange}
                        placeholder="Digite o título do curso"
                        required
                        style={{ width: '40%' }}
                    />

                    <label>Descrição do Curso<span style={{color: 'red'}}>*</span></label>
                    <input
                        name="descricao"
                        value={curso.descricao}
                        onChange={handleInputChange}
                        placeholder="Digite a descrição do curso"
                        required
                        className="input-descricao"
                    />

                    <label>Imagem de Capa:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="file-imagem-capa"
                    />

                    <label>Categoria<span style={{color: 'red'}}>*</span></label>
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
                        type="button"
                        className="btn-add-modulo"
                        onClick={handleAddModulo}
                    >
                        + Módulo
                    </button>

                    {curso.modulos.map((modulo, index) => (
                        <AdicionarModulos
                        key={index}
                        moduloIndex={index}
                        atualizarModulo={(moduloIndex, updatedModulo) => {
                            const modulosAtualizados = curso.modulos.map((m, i) =>
                                i === moduloIndex ? updatedModulo : m
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
