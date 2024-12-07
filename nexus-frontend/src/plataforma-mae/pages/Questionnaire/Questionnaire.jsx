import React, { useEffect, useState } from "react";
import api from "./../../../api";
import styles from './Questionnaire.module.css';
import Main from "../Main/Main";
import { Checkbox, Radio } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const Questionnaire = () => {
    const { idModule } = useParams();
    const { idCurso } = useParams();
    const userId = sessionStorage.getItem('userId');
    const [idRegistration, setIdRegistration] = useState(null);
    const [idQuestionnaire, setIdQuestionnaire] = useState(null);
    const [dataQuestionnaire, setDataQuestionnaire] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [isNewProgress, setIsNewProgress] = useState(true)
    const [idProgress, setIdProgress] = useState(null);

    const buscarDadosQuestionario = () => {
        api.get(`/questionarios/modulo/${idModule}`)
            .then((response) => {
                const { data } = response;
                setDataQuestionnaire(data);
                setIdQuestionnaire(data.id);
                setSelectedAnswers(Array(data.perguntas.length).fill(null));

                const correctAnswersFromData = data.perguntas.map((pergunta) =>
                    pergunta.respostas.findIndex((resposta) => resposta.respostaCerta)
                );
                setCorrectAnswers(correctAnswersFromData);

            })
            .catch((e) => {
                console.log("Erro ao buscar dados do questionário:", e);
            });
    };

    const enviarProgressoQuestionario = () => {

        if (isNewProgress) {
            const progressData = {
                pontuacao: calcularPontuacao(),
                matriculaId: idRegistration,
                questionarioId: idQuestionnaire
            }

            api.post(`/progresso-questionarios`, progressData)
                .then((response) => {
                    const { data } = response;
                
                    if (response.status == 201 && response.data) {
                        toast.success(`Suas respostas foram enviadas!`, {
                            position: "bottom-right",
                            autoClose: 10000,
                        })
                    }
                    verificarAprovacaoPontuacao(data);
                })
                .catch(() => {
                    toast.error(`Ocorreu um erro ao enviar as respostas. Tente novamente!`, {
                        position: "bottom-right",
                        autoClose: 10000,
                    })
                })

        } else {
            const pontuacaoAtualizada = calcularPontuacao();
            api.patch(`progresso-questionarios/pontuacao/${idProgress}/${pontuacaoAtualizada}`)
                .then((response) => {
                    const { data } = response;
                    
                    if (response.status == 200 && response.data) {
                        toast.success(`Suas respostas foram enviadas!`, {
                            position: "bottom-right",
                            autoClose: 10000,
                        })
                    }
                    verificarAprovacaoPontuacao(data);
                })
                .catch(() => {
                    toast.error(`Ocorreu um erro ao enviar as respostas. Tente novamente!`, {
                        position: "bottom-right",
                        autoClose: 10000,
                    })
                })
        }
    }

    
    const verificarAprovacaoPontuacao = (pontuacao) => {
        if (pontuacao >= 75) {
            Swal.fire({
                title: "Parabéns!",
                text: `Você alcançou a nota necessária para este questionário. Porcentagem de acertos: ${pontuacao}%.`,
                icon: "success",
                confirmButtonColor: "#3B9D3B",
                confirmButtonText: "Ok",
            }).then((result) => {

                if(result.value == true) {
                    const url = `/aluno/cursos/${idCurso}/modulos`
                    window.location.href = url;
                }
                
            
            });
        } else {
            Swal.fire({
                title: "Não foi desta vez!",
                text: `Você não atingiu a nota necessária para este questionário. Porcentagem de acertos: ${pontuacao}%. Tente novamente!`,
                icon: "error",
                showCancelButton: true,
                confirmButtonColor: "#FF4C4C",
                cancelButtonColor: "#dadada",
                cancelButtonText: "Sair",
                confirmButtonText: "Tentar novamente",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    const url = `/aluno/cursos/${idCurso}/modulos/${idModule}`
                    window.location.href = url;
                }
            });
        }
    }

    const verificarProgresso = () => {
        if (idRegistration && idQuestionnaire) {
            api.get(`/progresso-questionarios/${idRegistration}/${idQuestionnaire}`)
                .then((response) => {
                    const { data } = response;
                    if (data) {
                        setIsNewProgress(false);
                        setIdProgress(data.id)
                    }
                })
                .catch((e) => {
                    console.log("Erro ao verificar progresso:", e);
                });
        }
    };

    const buscarDadosDaMatricula = () => {
        api.get(`/matriculas/${userId}/${idCurso}`)
            .then((response) => {
                console.log(response.data)
                if (response.status == 200) {
                    setIdRegistration(response.data)
                }
            })
            .catch(() => {
                console.log("erro")
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([buscarDadosQuestionario(), buscarDadosDaMatricula()]);
            } catch (e) {
                console.error("Erro ao carregar dados", e);
            }
        };
        fetchData();
    }, [idCurso, idModule, userId]);

    useEffect(() => {
        if (idRegistration && idQuestionnaire) {
            verificarProgresso();
        }
    }, [idRegistration, idQuestionnaire]);

    if (!dataQuestionnaire) {
        return <div>Carregando...</div>;
    }

    const handleSelectAnswer = (questionIndex, answerIndex) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = answerIndex;
        setSelectedAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < dataQuestionnaire.perguntas.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSelectQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const currentQuestion = dataQuestionnaire.perguntas[currentQuestionIndex];

    const calcularPontuacao = () => {
        const correctCount = selectedAnswers.reduce((acc, answerIndex, questionIndex) => {
            if (answerIndex === correctAnswers[questionIndex]) {
                return acc + 1;
            }
            return acc;
        }, 0);

        const totalQuestions = correctAnswers.length;
        const percentageScore = Math.round((correctCount / totalQuestions) * 100);

        return percentageScore;
    };

    return (
        <Main showReturnPages>
            <div className={styles['content__info']}>
                <h2>{dataQuestionnaire.titulo}</h2>
                <p>{dataQuestionnaire.descricao}</p>
            </div>

            <div className={styles['content__review']}>
                <h2>Perguntas</h2>
                <div className={styles['review__itens']}>
                    {dataQuestionnaire.perguntas.map((pergunta, index) => (
                        <div className={styles['review__item']} key={index}>
                            <Checkbox
                                checked={selectedAnswers[index] !== null}
                            />
                            <p
                                onClick={() => handleSelectQuestion(index)}
                            >
                                {index + 1}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles['content__question']}>
                <h2>Pergunta {currentQuestionIndex + 1} de {dataQuestionnaire.perguntas.length}</h2>
                <div className={styles['question__line']}></div>
                <div className={styles['question__form']}>
                    <h2>{currentQuestionIndex + 1} - {currentQuestion.pergunta}</h2>
                    <div className={styles['form__alternatives']}>
                        {currentQuestion.respostas.map((resposta, index) => (
                            <div
                                className={styles['alternatives__alternative']}
                                key={index}
                                onClick={() => handleSelectAnswer(currentQuestionIndex, index)}
                            >
                                <Radio
                                    checked={selectedAnswers[currentQuestionIndex] === index}
                                />
                                <p>{resposta.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles['content__buttons']}>
                <button
                    className={styles['buttons__back']}
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                >
                    Voltar
                </button>
                {selectedAnswers.length === dataQuestionnaire.perguntas.length &&
                    selectedAnswers.every(answer => answer !== null) &&
                    currentQuestionIndex === dataQuestionnaire.perguntas.length - 1 ? (
                    <button
                        className={styles['buttons__foward']}
                        onClick={enviarProgressoQuestionario}
                    >
                        Enviar
                    </button>
                ) : (
                    <button
                        className={styles['buttons__foward']}
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === dataQuestionnaire.perguntas.length - 1}
                    >
                        Próxima
                    </button>
                )}
            </div>
            <ToastContainer />
        </Main>
    );
};

export default Questionnaire;
