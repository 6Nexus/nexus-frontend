import React from "react";
import { useParams } from 'react-router-dom';
import styles from './CourseDetails.module.css'
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import BannerInfoCourse from "../../components/BannerInfoCourse/BannerInfoCourse";
import YoutubePlaylist from "../../components/PlaylistYt/YoutubePlaylist";
import ImagemTeste from "../../../utils/assets/imagem-card-teste.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const CourseDetails = () => {
    const { idCurso } = useParams();

    return (
        <>
            <div className={styles["courseDetails-container"]}>
                <SideBar backgroundColor={'#245024'} />

                <div className={styles["courseDetails-container__content"]}>
                    <SearchBar />

                    <div className={styles['courseDetails-container__content__info']}>
                        <div className={styles['info__return']}>
                            <ArrowBackIcon className={styles['return__icon']} />
                            <p className={styles['return__text']}>Voltar</p>
                        </div>
                        <BannerInfoCourse
                            backgroundImage={ImagemTeste}
                            titleCourse="Curso de React para iniciante"
                            descriptionCourse="Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam! Aut impedit assumenda rem odio quibusdam id nulla doloribus quo reprehenderit nisi in distinctio amet qui consequuntur sequi sit natus dolorem."
                            duration="10"

                        />
                    </div>

                    <YoutubePlaylist titlePlaylist="Próximas aulas" playlistId="PLx4x_zx8csUh752BVDGZkxYpY9lS40fyC" isCursoDetails={true} />


                    <div className={styles['courseDetails-container__content__questionnaire']}>
                        <div className={styles['questionnaire']}>
                            <WorkspacePremiumIcon className={styles['questionnaire__icon']}/>
                            <div className={styles['questionnaire__info']}>
                                <h2>Certificado de React</h2>
                                <p>10 perguntas sobre os conhecimentos adquiridos durante as aulas</p>
                            </div>
                        </div>

                        <button className={styles['questionnaire__button']}>
                            Iniciar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CourseDetails