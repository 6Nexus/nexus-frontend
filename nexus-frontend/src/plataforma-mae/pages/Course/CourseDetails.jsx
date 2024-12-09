import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from "./../../../api";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import styles from './CourseDetails.module.css';
import Main from "../Main/Main";
import YoutubePlaylist from "../../components/PlaylistYt/YoutubePlaylist";
import BannerInfoModule from "../../components/BannerInfoModule/BannerInfoModule";

const CourseDetails = () => {
    const { idModule, idCurso } = useParams();
    const location = useLocation();
    const { title, subtitle, criadoEm } = location.state || {};
    const date = new Date(criadoEm);

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short'
    }).format(date);

    const [idRegistration, setIdRegistration] = useState(null);
    const [idQuestionnaire, setIdQuestionnaire] = useState(null);
    const [questionnaireTitle, setQuestionnaireTitle] = useState(null);
    const [questionnaireDescription, setQuestionnaireDescription] = useState(null);
    const userId = sessionStorage.getItem('userId');
    const [showButtonQuestionnaire, setShowButtonQuestionnaire] = useState(true);
    const [showSecondaryButton, setShowSecondaryButton] = useState(false);
    const [allCheckboxesSelected, setAllCheckboxesSelected] = useState(false);
    const navigate = useNavigate();

    const [countVideo, setCountVideo] = useState(null);

    const handleVideoCount = (video) => {
        setCountVideo(video);
    };

    const handleNavigation = (route) => {
        navigate(route);
    };

    const handleAllCheckboxesChecked = () => {
        setAllCheckboxesSelected(true);  
    };

    const verificarProgressoQuestionario = () => {
        if (idRegistration && idQuestionnaire) {
            api.get(`/progresso-questionarios/${idRegistration}/${idQuestionnaire}`)
                .then((response) => {
                    const { data } = response;
                    if (data.pontuacao >= 75) {
                        setShowButtonQuestionnaire(false);
                    }

                    if (data && data.pontuacao < 75) {
                        setShowSecondaryButton(true)
                    }
                })
                .catch((e) => {
                    console.log("Erro ao verificar progresso:", e);
                });
        }
    };

    const buscarDadosQuestionario = () => {
        return api.get(`/questionarios/modulo/${idModule}`)
            .then((response) => {
                if (response.data && response.data.id) {
                    setIdQuestionnaire(response.data.id);
                    setQuestionnaireTitle(response.data.titulo);
                    setQuestionnaireDescription(response.data.descricao)
                }
            })
            .catch((e) => {
                console.log("Erro ao buscar dados do questionário:", e);
            });
    };

    const buscarDadosDaMatricula = () => {
        return api.get(`/matriculas/${userId}/${idCurso}`)
            .then((response) => {
                if (response.status === 200 && response.data) {
                    setIdRegistration(response.data);
                }
            })
            .catch((e) => {
                console.log("Erro ao buscar dados da matrícula:", e);
            });
    };

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
            verificarProgressoQuestionario();
        }
    }, [idRegistration, idQuestionnaire]);

    return (
        <Main showReturnPages={true}>
            <div className={styles["content__info"]}>
                <BannerInfoModule
                    titleModule={title}
                    descriptionModule={subtitle}
                    duration={countVideo}
                    date={formattedDate}
                />
            </div>

            <YoutubePlaylist
                titlePlaylist="Próximas aulas"
                isCursoDetails={true}
                onVideoCount={handleVideoCount}
                onAllCheckboxesChecked={handleAllCheckboxesChecked}
            />

            {allCheckboxesSelected &&
            <div className={styles['content__questionnaire']}>
                <div className={styles['questionnaire']}>
                    <WorkspacePremiumIcon
                        className={styles['questionnaire__icon']}
                        sx={{ fontSize: 48 }}
                    />
                    <div className={styles['questionnaire__info']}>
                        <h2>{questionnaireTitle}</h2>
                        <p>{questionnaireDescription}</p>
                    </div>
                </div>
                {showButtonQuestionnaire ? (
                    showSecondaryButton ? (
                        <button
                            className={`${styles['questionnaire__button']} ${styles['questionnaire__button-custom']}`}
                            onClick={() => handleNavigation(`/aluno/questionario/${idCurso}/${idModule}`)}
                        >
                            Tentar novamente
                        </button>
                    ) : (
                        <button
                            className={styles['questionnaire__button']}
                            onClick={() => handleNavigation(`/aluno/questionario/${idCurso}/${idModule}`)}
                        >
                            Iniciar
                        </button>
                    )
                ) : (
                   <p className={styles['questionnaire__text']}>Finalizado</p>
                )}
            </div>
            }
        </Main>
    );
};

export default CourseDetails;
