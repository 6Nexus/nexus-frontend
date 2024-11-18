import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styles from './CourseModules.module.css'
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardModules from "../../components/CardModules/CardModules";
import BannerInfoCourse from "../../components/BannerInfoCourse/BannerInfoCourse"
import { useNavigate } from 'react-router-dom';
import api from "../../../api";

const CourseModules = () => {
    const {idCurso} = useParams();
    const [modules, setModules] = useState([]);
    const [course, setCourse] = useState([]);
    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    };

    function buscarCurso() {
        api.get(`/cursos/${idCurso}`)
            .then((response) => {
                const { data } = response;
                setCourse(data)
            }).catch((e) => {
                console.log("Deu", e)
            })
    }

    function buscarModulos() {
        api.get(`/modulos/curso/${idCurso}`)
          .then((response) => {
            const { data } = response;
            setModules(data)
        }).catch((e) => {
            console.log("Deu erro", e)
        })
    }

    useEffect(() => {
        buscarModulos();
        buscarCurso();  
    }, [])

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
                        <BannerInfoCourse courseName={course.titulo} teacherName={course.professor} description={course.descricao}/>
                    </div>

                    <div className={styles['courseModules-container__content__modulesList']}>
                        <p className={styles["courseList__title"]}>Módulos</p>
                       
                           {modules && modules.map((module, _) => (
                                <CardModules
                                    idModule={module.id}
                                    idCourse={idCurso}
                                    title={module.titulo}
                                    subtitle={module.titulo}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
export default CourseModules