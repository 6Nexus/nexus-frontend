import React, { useEffect, useState } from "react";
import api from "./../../../api";
import styles from './Questionnaire.module.css'
import SideBar from "../../components/SideBar/SideBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Checkbox, Radio } from "@mui/material";
import { useParams } from "react-router-dom";

const Questionnaire = () => {
    const { idModule } = useParams();
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
        setCurrentQuestionIndex(index)
    };

    const currentQuestion = dataQuestionnaire.perguntas[currentQuestionIndex];

    return (
        <>
            <div className={styles["questionnaire-container"]}>
                <SideBar backgroundColor={'#245024'} />

                <div className={styles["questionnaire-container__content"]}>
                    <SearchBar />

                    <div className={styles['content__return']}>
                        <ArrowBackIcon className={styles['return__icon']} />
                        <p className={styles['return__text']}>Voltar</p>
                    </div>

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
                </div>
            </div>
        </>
    );
};
export default Questionnaire