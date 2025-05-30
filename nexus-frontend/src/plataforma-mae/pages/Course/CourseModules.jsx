import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "./../../../api";
import styles from './CourseModules.module.css';
import Main from "../Main/Main";
import CardModules from "../../components/CardModules/CardModules";
import BannerInfoCourse from "../../components/BannerInfoCourse/BannerInfoCourse";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigation } from "../../../NavigationContext";

const CourseModules = () => {
    const id = sessionStorage.getItem('userId');
    const { idCurso } = useParams();
    const [modules, setModules] = useState([]);
    const [course, setCourse] = useState([]);
    const [registration, setRegistration] = useState(false);
    const { addToPilha } = useNavigation();
    const navigate = useNavigate();

    useEffect(() => {
        buscarCurso();
        buscarModulos();

        addToPilha(window.location.pathname);
    }, [idCurso]);

    const buscarCurso = () => {
        api.get(`/cursos/${idCurso}`)
            .then(({ data }) => setCourse(data))
            .catch((e) => console.log("Erro ao buscar curso:", e));
    };

    const buscarModulos = () => {
        api.get(`/modulos/curso/${idCurso}`)
            .then(({ data }) => {
                console.log('Dados módulos:', data);
                // Ajuste aqui se 'data' for um objeto contendo array em outra propriedade
                // Exemplo comum: setModules(data.modulos)
                // Se data já for array, pode usar direto:
                setModules(Array.isArray(data) ? data : []);
            })
            .catch((e) => console.log("Erro ao buscar módulos:", e));
    };

    const verificarMatricula = () => {
        api.get(`/matriculas/${id}/${idCurso}`)
            .then(({ status }) => {
                if (status === 200) {
                    setRegistration(true);
                }
            })
            .catch(() =>
                toast.info(`Você ainda não tem acesso aos módulos deste curso. Para acessar, realize sua matrícula em apenas um clique!`, {
                    position: "bottom-right",
                    autoClose: 10000,
                })
            );
    };

    const atualizarDados = () => {
        verificarMatricula();
        buscarCurso();
        buscarModulos();
    };

    const handleNavigation = (idModule) => {
        const nextUrl = `/detalhes-modulo/${idModule}`;
        addToPilha(nextUrl); 
        navigate(nextUrl);
    };

    useEffect(() => {
        atualizarDados();
    }, []);

    return (
        <Main enableReturnPages={true}>
            <div className={styles["info"]}>
                <ToastContainer />
                <BannerInfoCourse
                    courseName={course.titulo}
                    teacherName={course.professorNome}
                    description={course.descricao}
                    showButton={!registration}
                    onMatriculaConcluida={atualizarDados}
                />
            </div>

            <div className={styles['modulesList']}>
                <p className={styles["title"]}>Módulos</p>
                {Array.isArray(modules) && modules.map((module) => (
                    <CardModules
                        key={module.id}
                        idModule={module.id}
                        idCourse={idCurso}
                        title={module.titulo}
                        subtitle={module.descricao}
                        criadoEm={module.criadoEm}
                        showButton={registration}
                        onClick={() => handleNavigation(module.id)}
                    />
                ))}
            </div>
        </Main>
    );
};

export default CourseModules;
