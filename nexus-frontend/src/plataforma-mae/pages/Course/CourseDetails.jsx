import React from "react";
import { useParams } from 'react-router-dom';
import styles from './CourseDetails.module.css'
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import YoutubePlaylist from "../../components/PlaylistYt/YoutubePlaylist";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BannerInfoModule from "../../components/BannerInfoModule/BannerInfoModule";
import { useNavigate } from 'react-router-dom';

const CourseDetails = () => {
    const {idCurso}  = useParams();
    const {idModulo} = useParams();

    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    };
    
    return (
        <>
            <div className={styles["courseDetails-container"]}>
                <SideBar backgroundColor={'#245024'} />

                <div className={styles["courseDetails-container__content"]}>
                    <SearchBar />

                    <div className={styles['courseDetails-container__content__info']}>
                        <div className={styles['info__return']}>
                            <ArrowBackIcon className={styles['return__icon']} onClick={() => handleNavigation(`/cursos/${idCurso}/modulos`)}/>
                            <p className={styles['return__text']}>Voltar</p>
                        </div>
                        <BannerInfoModule titleModule="Modulo 1" descriptionModule="Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam! Aut impedit assumenda rem odio quibusdam id nulla doloribus quo reprehenderit nisi in distinctio amet qui consequuntur sequi sit natus dolorem." duration="20" date="24/09/2023"/>
                    </div>

                    <YoutubePlaylist titlePlaylist="Próximas aulas" playlistId="PL29TaWXah3iaqOejItvW--TaFr9NcruyQ" isCursoDetails={true} />


                    <div className={styles['courseDetails-container__content__questionnaire']}>
                        <div className={styles['questionnaire']}>
                            <WorkspacePremiumIcon className={styles['questionnaire__icon']} sx={{ fontSize: 48}}/>
                            <div className={styles['questionnaire__info']}>
                                <h2>Certificado de React</h2>
                                <p>10 perguntas sobre os conhecimentos adquiridos durante as aulas</p>
                            </div>
                        </div>

                        <button className={styles['questionnaire__button']} onClick={() => handleNavigation(`/questionario/${idCurso}`)}>
                            Iniciar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CourseDetails