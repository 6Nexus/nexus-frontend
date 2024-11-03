import React from "react";
import { useParams } from 'react-router-dom';
import styles from './CourseModules.module.css'
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardModules from "../../components/CardModules/CardModules";
import BannerInfoCourse from "../../components/BannerInfoCourse/BannerInfoCourse"
import { useNavigate } from 'react-router-dom';

const CourseModules = () => {
    const {idCurso} = useParams();

    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <>
            <div className={styles["courseModules-container"]}>
                <SideBar backgroundColor={'#245024'} />

                <div className={styles["courseModules-container__content"]}>
                    <SearchBar />

                    <div className={styles['courseModules-container__content__info']}>
                        <div className={styles['info__return']}>
                            <ArrowBackIcon className={styles['return__icon']} onClick={() => handleNavigation(`/aluno/cursos`)} />
                            <p className={styles['return__text']}>Voltar</p>
                        </div>
                        <BannerInfoCourse courseName="Nome do curso" teacherName="Ana Luiza Santos" teacherEmail="ana.lsantos@gmail.com"/>
                    </div>

                    <div className={styles['courseModules-container__content__modulesList']}>
                        <p className={styles["courseList__title"]}>Módulos</p>
                        <CardModules idModule={1} idCourse={idCurso} inProgress={true} title="Módulo 1" subtitle="Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam! Aut impedit assumenda rem odio quibusdam id nulla doloribus quo reprehenderit nisi in distinctio amet qui consequuntur sequi sit natus dolorem." />
                        <CardModules idModule={2} idCourse={idCurso} inProgress={false} title="Módulo 2" subtitle="Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam! Aut impedit assumenda rem odio quibusdam id nulla doloribus quo reprehenderit nisi in distinctio amet qui consequuntur sequi sit natus dolorem." />
                    </div>
                </div>
            </div>
        </>
    );
};
export default CourseModules