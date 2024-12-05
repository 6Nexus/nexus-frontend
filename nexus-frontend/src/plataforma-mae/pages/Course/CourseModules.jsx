import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "./../../../api";
import styles from './CourseModules.module.css';
import Main from "../Main/Main";
import CardModules from "../../components/CardModules/CardModules";
import BannerInfoCourse from "../../components/BannerInfoCourse/BannerInfoCourse";
import { useNavigation } from "../../../NavigationContext";

const CourseModules = () => {
    const { idCurso } = useParams();
    const [modules, setModules] = useState([]);
    const [course, setCourse] = useState([]);
    const navigate = useNavigate();
    const { addToPilha } = useNavigation();

    useEffect(() => {
        buscarCurso();
        buscarModulos();

        // Adiciona a URL atual à pilha ao carregar
        addToPilha(window.location.pathname);
    }, [idCurso]);

    const buscarCurso = () => {
        api.get(`/cursos/${idCurso}`)
            .then(({ data }) => setCourse(data))
            .catch((e) => console.log("Erro ao buscar curso:", e));
    };

    const buscarModulos = () => {
        api.get(`/modulos/curso/${idCurso}`)
            .then(({ data }) => setModules(data))
            .catch((e) => console.log("Erro ao buscar módulos:", e));
    };

    const handleNavigation = (idModule) => {
        const nextUrl = `/detalhes-modulo/${idModule}`;
        addToPilha(nextUrl); // Adiciona a próxima URL à pilha antes de navegar
        navigate(nextUrl);
    };

    return (
        <Main enableReturnPages={true}>
            <div className={styles["info"]}>
                <BannerInfoCourse
                    courseName={course.titulo}
                    teacherName={course.professor}
                    description={course.descricao}
                />
            </div>

            <div className={styles['modulesList']}>
                <p className={styles["title"]}>Módulos</p>
                {modules.map((module) => (
                    <CardModules
                        key={module.id}
                        idModule={module.id}
                        idCourse={idCurso}
                        title={module.titulo}
                        subtitle={module.titulo}
                        onClick={() => handleNavigation(module.id)}
                    />
                ))}
            </div>
        </Main>
    );
};

export default CourseModules;
