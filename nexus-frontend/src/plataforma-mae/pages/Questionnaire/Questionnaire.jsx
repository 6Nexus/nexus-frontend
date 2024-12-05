import React, { useEffect, useState } from "react";
import api from "./../../../api";
import styles from './Questionnaire.module.css';
import Main from "../Main/Main";
import { Checkbox, Radio } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useNavigation } from "../../../NavigationContext"; // Hook de navegação

const Questionnaire = () => {
    const { idModule } = useParams();
    const navigate = useNavigate();
    const { pilha, removeFromPilha } = useNavigation(); // Gerenciamento da pilha de navegação

    const [dataQuestionnaire, setDataQuestionnaire] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const buscarDadosQuestionario = () => {
        api.get(`/questionarios/modulo/${idModule}`)
            .then((response) => {
                const { data } = response;
                setDataQuestionnaire(data);
                setSelectedAnswers(Array(data.perguntas.length).fill(null));
            })
            .catch((e) => {
                console.log("Erro ao buscar dados do questionário:", e);
            });
    };

    useEffect(() => {
        buscarDadosQuestionario();
    }, []);

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

    // Lógica de navegação de "Voltar"
    const handleBackNavigation = () => {
        if (pilha.length > 1) {
            const previousUrl = pilha[pilha.length - 2]; // Recupera a URL anterior na pilha
            removeFromPilha(); // Remove a URL atual da pilha
            navigate(previousUrl); // Navega para a página anterior
        } else {
            navigate('/aluno/cursos'); // Caso não tenha pilha vai para cursos
        }
    };

    return (
        <Main enableReturnPages={true}>
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
                    onClick={currentQuestionIndex === 0 ? handleBackNavigation : handlePreviousQuestion}
                >
                    {currentQuestionIndex === 0 ? "Voltar" : "Anterior"}
                </button>
                {selectedAnswers.length === dataQuestionnaire.perguntas.length &&
                    selectedAnswers.every(answer => answer !== null) &&
                    currentQuestionIndex === dataQuestionnaire.perguntas.length - 1 ? (
                    <button
                        className={styles['buttons__foward']}
                        onClick={() => console.log("Enviar respostas: ", selectedAnswers)}
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
        </Main>
    );
};

export default Questionnaire;
