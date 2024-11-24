import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import styles from './CourseDetails.module.css';
import Main from "../Main/Main";
import YoutubePlaylist from "../../components/PlaylistYt/YoutubePlaylist";
import BannerInfoModule from "../../components/BannerInfoModule/BannerInfoModule";

const CourseDetails = () => {
    const { idModule } = useParams();
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <Main showReturnPages={true}>
            <div className={styles["content__info"]}>
                <BannerInfoModule 
                    titleModule="Modulo 1" 
                    descriptionModule="Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam! Aut impedit assumenda rem odio quibusdam id nulla doloribus quo reprehenderit nisi in distinctio amet qui consequuntur sequi sit natus dolorem." 
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
