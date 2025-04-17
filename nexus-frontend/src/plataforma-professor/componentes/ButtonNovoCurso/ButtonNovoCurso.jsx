import React, { useState, useEffect } from "react";
import './ButtonNovoCurso.css';
import SideBar from "../../componentes/SideBar/SideBar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdicionarModulos from "../Modulos/AdicionarModulos";
import api from "../../../api.js";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

function ButtonNovoCurso({ onClose, cursoAEditar }) {   
    const [curso, setCurso] = useState({
        titulo: '',
        descricao: '',
        imagem: null,
        categoria: '',
        modulos: []
    }); 

    const navigate = useNavigate();

    useEffect(() => {
        if (cursoAEditar) {
            const mapearCursoExistente = async () => {
                try {
                    const moduloResposta = await api.get(`/modulos/curso/${cursoAEditar.id}`);
                    const modulos = moduloResposta.data;
                    
                    if (modulos.length > 0) {
                        cursoAEditar = { ...cursoAEditar, modulos };

                        for (const modulo of cursoAEditar.modulos) {
                            try {
                                const questionarioResposta = await api.get(`/questionarios/modulo/${modulo.id}`);
                                const questionario = questionarioResposta.data;
                                modulo.questionario = questionario;
                            } catch (error) {
                                // toast.error(error.message);
                                modulo.questionario = { perguntas: [ { respostas: [] } ] };
                            }
                            
                            const videoResposta = await api.get(`/videos/modulo/${modulo.id}`);
                            const videos = videoResposta.data;
                            modulo.aulas = videos ? videos : [];
                        }
                    }
                    setCurso(cursoAEditar);
                } catch (error) {
                    toast.error(error.message);
                    const modulos = [];
                    cursoAEditar = { ...cursoAEditar, modulos }
                }
            }
            mapearCursoExistente();
        }
    }, [])

    useEffect(() => {
        console.log(curso);
    }, [curso]);

    const atualizarCurso = (campo, valor) => {
        setCurso((prevCurso) => ({
            ...prevCurso,
            [campo]: valor
        }));
    };

    const atualizarModulo = (indexModulo, campo, valor) => {
        setCurso((prevCurso) => {
            let novosModulos = [...prevCurso.modulos];

            if (campo === 'delete') {
                novosModulos = novosModulos.filter((_, index) => index !== indexModulo);

            } else if (indexModulo === -1) {
                novosModulos.push({ titulo: '', descricao: '', aulas: [], 
                    questionario: { titulo: 'Questionário', descricao: 'Descrição do questionário', perguntas: [] }});

            } else {
                novosModulos[indexModulo] = {
                    ...novosModulos[indexModulo],
                    [campo]: valor
                };
            }

            return {
                ...prevCurso,
                modulos: novosModulos
            };
        });
    };

    const atualizarAula = (indexModulo, indexAula, campo, valor) => {
        setCurso((prevCurso) => {
            let novosModulos = [...prevCurso.modulos];

            if (campo === 'delete') {
                novosModulos[indexModulo].aulas = novosModulos[indexModulo].aulas.filter((_, index) => index !== indexAula);

            } else if (indexAula === -1) {
                novosModulos[indexModulo].aulas.push({ titulo: '', descricao: '', video: '' });

            } else {
                novosModulos[indexModulo].aulas[indexAula] = {
                    ...novosModulos[indexModulo].aulas[indexAula],
                    [campo]: valor
                };
            }

            return {
                ...prevCurso,
                modulos: novosModulos
            };
        });
    };

    const atualizarPergunta = (indexModulo, indexPergunta, campo, valor) => {
        setCurso((prevCurso) => {
            let novosModulos = [...prevCurso.modulos];

            
            if (campo === 'delete') {
                novosModulos[indexModulo].questionario.perguntas = novosModulos[indexModulo].questionario.perguntas.filter((_, index) => index !== indexPergunta);

            } else if (indexPergunta === -1) {
                novosModulos[indexModulo].questionario.perguntas.push({ pergunta: '', respostas: [] });

            } else {
                novosModulos[indexModulo].questionario.perguntas[indexPergunta] = {
                    ...novosModulos[indexModulo].questionario.perguntas[indexPergunta],
                    [campo]: valor
                };
            }

            return {
                ...prevCurso,
                modulos: novosModulos
            };
        });
    };

    const atualizarResposta = (indexModulo, indexPergunta, indexResposta, campo, valor, tipo) => {
        setCurso((prevCurso) => {
            let novosModulos = [...prevCurso.modulos];

            if (campo === 'delete') {
                novosModulos[indexModulo].questionario.perguntas[indexPergunta].respostas = novosModulos[indexModulo].questionario.perguntas[indexPergunta].respostas.filter((_, index) => index !== indexResposta);

            } else if (indexResposta === -1) {
                novosModulos[indexModulo].questionario.perguntas[indexPergunta].respostas.push({ resposta: '', respostaCerta: false });
            
            } else if (tipo === 'radio') {
                novosModulos[indexModulo].questionario.perguntas[indexPergunta].respostas = novosModulos[indexModulo].questionario.perguntas[indexPergunta].respostas.map((resposta, index) => {
                    return {
                        ...resposta,
                        respostaCerta: index === indexResposta
                    };
                });
            
            } else {
                novosModulos[indexModulo].questionario.perguntas[indexPergunta].respostas[indexResposta] = {
                    ...novosModulos[indexModulo].questionario.perguntas[indexPergunta].respostas[indexResposta],
                    [campo]: valor
                };
            }

            return {
                ...prevCurso,
                modulos: novosModulos
            };
        });
    };
    
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

    const onSave = async (e) => {
        e.preventDefault();

        try {
            const cursoRequisicao = {
                titulo: curso.titulo,
                descricao: curso.descricao,
                categoria: curso.categoria,
                idProfessor: sessionStorage.getItem('userId')
            };
            const { imagem, modulos } = curso;

            let idCurso;
            if (curso.id) {
                idCurso = curso.id;
                await api.put(`/cursos/${idCurso}`, cursoRequisicao);
                
            } else {
                const respostaCurso = await api.post('/cursos', cursoRequisicao);
                idCurso = respostaCurso.data;
                navigate('/meus-cursos')
            }

            if (imagem) {
                const formData = new FormData();
                formData.append('file', imagem); 
              
                await api.patch(`/cursos/capa/${idCurso}`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });
              }

            for (const modulo of modulos) {
                const { titulo, descricao } = modulo;
                const moduloRequisicao = {
                    titulo,
                    descricao,
                    ordem: modulos.indexOf(modulo) + 1,
                    idCurso
                };

                let idModulo;
                if (modulo.id) {
                    idModulo = modulo.id;
                    await api.put(`/modulos/${idModulo}`, moduloRequisicao);
                } else {
                    const respostaModulo = await api.post('/modulos', moduloRequisicao);
                    idModulo = respostaModulo.data;
                }


                if (modulo.aulas.length > 0) {
                    for (const aula of modulo.aulas) {
                        const aulaRequisicao = {
                            titulo: aula.titulo,
                            descricao: aula.descricao,
                        };

                        if (aula.id) {
                            const idAula = aula.id
                            await api.put(`/videos/${idAula}`, aulaRequisicao);
                        } else {
                            aulaRequisicao.ordem = modulo.aulas.indexOf(aula) + 1;
                            aulaRequisicao.idModulo = idModulo;

                            const formDataAula = new FormData();
                            formDataAula.append('json', JSON.stringify(aulaRequisicao));
                            formDataAula.append('arquivo', aula.video);
    
                            api.post(`/videos`, formDataAula, {headers: {
                                'Content-Type': 'multipart/form-data',
                            }});
                        }
                    }
                }

                if (modulo.questionario.perguntas.length > 0 && !modulo.questionario.id) {
                    const questionarioRequisicao = {
                        titulo: "Título do Questionário",
                        descricao: "Descrição do Questionário",
                        idModulo,
                        perguntas: modulo.questionario.perguntas
                    };
                    await api.post('/questionarios', questionarioRequisicao);
                }
            }
            toast.success('Curso criado com sucesso!');           
        } catch (error) {
            toast.error(error.message);
        }
    }

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
                <form onSubmit={onSave} className="form-curso-criacao">
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

                    {
                    curso.modulos.map((modulo, index) => (
                        <AdicionarModulos
                            key={index}
                            moduloIndex={index}
                            modulo={modulo}
                            atualizarModulo={atualizarModulo}
                            atualizarAula={atualizarAula}
                            atualizarPergunta={atualizarPergunta}
                            atualizarResposta={atualizarResposta}
                        />
                    ))}

                    <button type="submit" className="btn-submit">Salvar Curso</button>
                </form>
            </div>
        </>
    );
}

export default ButtonNovoCurso;