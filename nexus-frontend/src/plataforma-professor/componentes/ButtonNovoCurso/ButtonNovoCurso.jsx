import React, { useState } from "react";
import './ButtonNovoCurso.css';
import SideBar from "../../componentes/SideBar/SideBar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdicionarModulos from "../Modulos/AdicionarModulos";
import { toast } from 'react-toastify';
import api from "../../../api.js";

function ButtonNovoCurso({ onClose }) {
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

    // separando o modulo do objeto de
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



    const handleSalvarCurso = (e) => {
        e.preventDefault();
        const { titulo, descricao, categoria } = curso;

        // if (!titulo || !descricao || !categoria) {
        //     toast.warning('Por favor, preencha todos os campos obrigatórios!')
        //     return;
        // }

        if (!titulo || !descricao || !categoria) {
            toast.warning('Por favor, preencha todos os campos obrigatórios!')
            return;
        }

        // if (modulos.length === 0) {
        //     toast.warning('Por favor, adicione pelo menos um módulo ao curso!');
        //     return;
        // }

        // // Log para verificar o estado dos módulos
        // console.log("Módulos no momento da validação:", modulos);

        // // Validação dos módulos
        // for (let i = 0; i < modulos.length; i++) {
        //     console.log("Validando módulo:", modulos[i]); // Log do módulo
        //     if (!modulos[i].titulo || !modulos[i].descricao) {
        //         toast.warning(`Por favor, preencha todos os campos do módulo ${i + 1}`);
        //         return;
        //     }

        //     // Verificação das aulas
        //     if (modulos[i].aulas.length === 0) {
        //         toast.warning(`O módulo ${i + 1} não possui aulas. Por favor, adicione pelo menos uma aula!`);
        //         return;
        //     }

        //     for (let j = 0; j < modulos[i].aulas.length; j++) {

        //         console.log("Validando aula:", modulos[i].aulas[j]); // Log da aula 

        //         if (!modulos[i].aulas[j].titulo || !modulos[i].aulas[j].descricao) {
        //             toast.warning(`Por favor, preencha todos os campos da aula ${j + 1} no módulo ${i + 1}`);
        //             return;
        //         }

        //         if(!modulos[i].aulas[j].conteudos.video){
        //             toast.warning(`A aula ${j + 1} não possui um vídeo. Adicione um conteúdo de vídeo!`)
        //         }


        //     }

        //     // Verificação se não tem questionário no módulo 
        //     if (modulos[i].questionario.length === 0) {
        //         toast.warning(`O módulo ${i + 1} não possui questionário. Por favor, adicione pelo menos uma questão!`);
        //         return;
        //     }   
        // }

        

        api.post('/cursos', curso, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.status === 201) {
                // A resposta da API deve conter o curso criado, incluindo o id gerado
                const createdCourse = response.data; // O objeto retornado pela API
                const cursoId = createdCourse.id; // Acessando o id do curso criado (id gerado pelo banco)
                
                // Atualizando o estado do curso com o id
                setCurso((prevCurso) => ({
                    ...prevCurso,
                    idCurso: cursoId, // Atualizando com o id do curso
                }));
    
                // Agora, os módulos podem ser atualizados com o idCurso
                setModulos((prevModulos) => 
                    prevModulos.map((modulo) => ({
                        ...modulo,
                        idCurso: cursoId, // Associando o curso ao módulo
                    }))
                );
    
                toast.success('Curso criado com sucesso!');
                resetForm(); // Resetando o formulário após o sucesso
            } else {
                throw new Error('Ops! Ocorreu um erro interno, tente mais tarde.');
            }
        })
        .catch((error) => {
            toast.error(error.message);
        });

        

        console.log('Curso Criado', curso);
        resetForm();
    };

    const resetForm = () => {
        setCurso({
            titulo: '',
            descricao: '',
            // imagem: null,
            categoria: '',
            // modulos: []
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

                    <button type="submit" className="btn-submit">Salvar Curso</button>
                </form>
            </div>
        </>
    );
}

export default ButtonNovoCurso;