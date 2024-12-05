import React, { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import styles from './CourseDetails.module.css';
import Main from "../Main/Main";
import YoutubePlaylist from "../../components/PlaylistYt/YoutubePlaylist";
import BannerInfoModule from "../../components/BannerInfoModule/BannerInfoModule";
import { useNavigation } from "../../../NavigationContext";

const CourseDetails = () => {
    const { idModule } = useParams();
    const navigate = useNavigate();
    const { addToPilha } = useNavigation();

    useEffect(() => {
        // Adiciona a URL atual à pilha ao carregar
        addToPilha(window.location.pathname);
    }, [idModule]);

    const handleNavigation = (route) => {
        addToPilha(route); // Adiciona a próxima URL à pilha antes de navegar
        navigate(route);
    };

    return (
        <Main enableReturnPages={true}>
            <div className={styles["content__info"]}>
                <BannerInfoModule 
                    titleModule="Módulo 1" 
                    descriptionModule="Lorem ipsum dolor sit amet."
                    duration="20" 
                    date="24/09/2023"
                />
            </div>

            <YoutubePlaylist 
                titlePlaylist="Próximas aulas" 
                playlistId="PL29TaWXah3iaqOejItvW--TaFr9NcruyQ" 
                isCursoDetails={true} 
            />

            <div className={styles['content__questionnaire']}>
            <div className={styles['questionnaire']}>
                    <WorkspacePremiumIcon 
                        className={styles['questionnaire__icon']} 
                        sx={{ fontSize: 48 }} 
                    />
                    <div className={styles['questionnaire__info']}>
                        <h2>Certificado de React</h2>
                        <p>10 perguntas sobre os conhecimentos adquiridos durante as aulas</p>
                    </div>
                </div>
                <button 
                    className={styles['questionnaire__button']} 
                    onClick={() => handleNavigation(`/aluno/questionario/${idModule}`)}
                >
                    Iniciar
                </button>
            </div>
        </Main>
    );
};

export default CourseDetails;
