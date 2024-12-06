import React from "react";
import { useParams } from 'react-router-dom';
import api from "./../../../api";
import styles from './BannerInfoCourse.module.css';
import IconCourse from '../../../utils/assets/course.svg'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BannerInfoCourse = ({ courseName, teacherName, description, showButton, onMatriculaConcluida }) => {
    const id = sessionStorage.getItem('userId');
    const { idCurso } = useParams();
    const dadosMatricula = {
        idAssociado: id,
        idCurso: idCurso
    }
    const realizarMatricula = () => {
        api.post(`/matriculas`, dadosMatricula)
            .then(({ status }) => {
                if (status == 201) {
                    toast.success(`Matrícula realizada com sucesso! Bons estudos.`, {
                        position: "bottom-right",
                        autoClose: 5000,
                    });
                    if (onMatriculaConcluida) {
                        onMatriculaConcluida();
                    }
                }
            })
            .catch(() =>
                toast.error(`Desculpe, houve um erro ao realizar a matricula. Tente novamente mais tarde!`, {
                    position: "bottom-right",
                    autoClose: 10000,
                })
            );
    };

    return (
        <>
            <div className={styles["bannerInfoCourse-container"]}>
                <div className={styles["bannerInfoCourse-container__icon"]}>
                    <img src={IconCourse} alt="" />
                </div>
                <div className={styles["bannerInfoCourse-container__text"]}>
                    <h2 className={styles["bannerInfoCourse-container-text__title"]}>Curso: {courseName}</h2>
                    <h4 className={styles["bannerInfoCourse-container-text__description"]}>{description} | Professor(a): {teacherName}</h4>
                </div>
                {showButton &&
                    <button className={styles["bannerInfoCourse-container__button"]} onClick={() => realizarMatricula()}>
                        Matricule-se
                    </button>
                }
            </div>

        </>
    );
};
export default BannerInfoCourse;