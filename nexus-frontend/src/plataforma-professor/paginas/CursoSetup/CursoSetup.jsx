import React, { useState, useEffect } from "react";
import './CursoSetup.css';
import SideBar from "../../componentes/SideBar/SideBar";
import ButtonNovoCurso from "../../componentes/ButtonNovoCurso/ButtonNovoCurso";
import api from "../../../api";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function CursoSetup() {
    const [curso, setCurso] = useState({
        titulo: '',
        descricao: '',
        imagem: null,
        categoria: '',
        modulos: []
    }); 

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
                console.log("Add aula");
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

    useEffect(() => {
        console.log("Estado atualizado:", curso);
    }, [curso]);

    const [mostrarCriarCurso, setMostrarCriarCurso] = useState(false);

    const abrirCriadorCurso = () => {
        setMostrarCriarCurso(true);
    };

    const fecharCriadorCurso = () => {
        setMostrarCriarCurso(false);
    };

    const onSave = async (e) => {
        e.preventDefault();

        const cursoRequisicao = {
            titulo: curso.titulo,
            descricao: curso.descricao,
            categoria: curso.categoria,
            idProfessor: sessionStorage.getItem('userId')
        };
        const { imagem, modulos } = curso;

        try {
            const respostaCurso = await api.post('/cursos', cursoRequisicao);
            const idCurso = respostaCurso.data;

            if (imagem) {
                const reader = new FileReader();

                reader.addEventListener("load", () => {
                    api.patch(`/cursos/capa/${idCurso}`, reader.result, {headers: {
                        "Accept": "application/json, image/*, */*",
                        'Content-Type': imagem.type
                    }});
                });
            
                reader.readAsArrayBuffer(imagem);
            }

            for (const modulo of modulos) {
                const { titulo, descricao } = modulo;
                const moduloRequisicao = {
                    titulo,
                    descricao,
                    ordem: modulos.indexOf(modulo) + 1,
                    idCurso
                };
    
                const respostaModulo = await api.post('/modulos', moduloRequisicao);
                const idModulo = respostaModulo.data;

                if (modulo.aulas.length > 0) {
                    for (const aula of modulo.aulas) {
                        const aulaRequisicao = {
                            titulo: aula.titulo,
                            descricao: descricao.descricao,
                            ordem: modulo.aulas.indexOf(aula) + 1,
                            idModulo
                        };

                        const formDataAula = new FormData();
                        formDataAula.append('json', JSON.stringify(aulaRequisicao));
                        formDataAula.append('arquivo', aula.video);

                        api.post(`/videos`, formDataAula, {headers: {
                            'Content-Type': 'multipart/form-data',
                        }});
                    }
                }

                if (modulo.questionario.perguntas.length > 0) {
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
            <div className="container-criar-curso">
                <div className="container-curso">

                    <button onClick={abrirCriadorCurso} className="btn-novo-curso">
                        + Novo Curso
                    </button>

                    {mostrarCriarCurso && (
                        <ButtonNovoCurso
                            key={curso.id}
                            curso={curso}
                            atualizarCurso={atualizarCurso}
                            atualizarModulo={atualizarModulo}
                            atualizarAula={atualizarAula}
                            atualizarPergunta={atualizarPergunta}
                            atualizarResposta={atualizarResposta}
                            onClose={fecharCriadorCurso}
                            onSave={onSave}
                        /> 
                    )}
                </div>
            </div>
        </>
    );
}

export default CursoSetup;
