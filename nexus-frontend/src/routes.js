import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeSite from "./site-institucional/page/Home/Home";
import Login from "./site-institucional/page/Login/Login";
import Cadastro from "./site-institucional/page/Cadastro/Cadastro";

import Home from "./plataforma-mae/pages/Home/Home";
import Course from "./plataforma-mae/pages/Course/Course";
import CourseDetails from './plataforma-mae/pages/Course/CourseDetails';
import CourseModules from "./plataforma-mae/pages/Course/CourseModules";
import Questionnaire from "./plataforma-mae/pages/Questionnaire/Questionnaire";
import Instructions from "./plataforma-mae/pages/Instructions/Instructions";
import ProfileSettings from "./plataforma-mae/pages/ProfileSettings/ProfileSettings";
import Certificates from "./plataforma-mae/pages/Certificates/Certificates";
import SavedCourses from "./plataforma-mae/pages/SavedCourses/SavedCourses";

import Professor from './plataforma-admin/pages/Professor/Professor';
import Mae from './plataforma-admin/pages/Mae/Mae';
import Curso from './plataforma-admin/pages/Curso/Curso';

import Perfil from "./plataforma-professor/paginas/Perfil/Perfil";
import LoginProfessor from './plataforma-professor/paginas/Login/Login';
import CadastroProfessor from "./plataforma-professor/paginas/CadastroProfessor/CadastroProfessor";
import CursoSetup from "./plataforma-professor/paginas/CursoSetup/CursoSetup";
import MeusCursos from "./plataforma-professor/paginas/MeusCursos/MeusCursos";
import Ajuda from "./plataforma-professor/paginas/Ajuda/Ajuda";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Rotas() {

    

    return (
        <BrowserRouter>
            <ToastContainer/>

            <Routes>
                {/* site-institucional */}
                <Route path="/" element={<HomeSite />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                {/* plataforma-mae */}
                <Route path="/aluno/inicio" element={<Home />} />
                <Route path="/aluno/cursos" element={<Course />} />
                <Route path="/aluno/cursos/:idCurso/modulos" element={<CourseModules />} />
                <Route path="/aluno/cursos/:idCurso/modulos/:idModule" element={<CourseDetails />} />
                <Route path="/aluno/questionario/:idCurso/:idModule" element={<Questionnaire />} />
                <Route path="/aluno/instrucoes" element={<Instructions />} />
                <Route path="/aluno/perfil" element={<ProfileSettings />} />
                <Route path="/aluno/certificados" element={<Certificates />} />
                <Route path="/aluno/cursos-salvos" element={<SavedCourses />} />

                {/* plataforma-admin */}
                <Route path="/admin/professores" element={<Professor />} />
                <Route path="/admin/maes" element={<Mae />} />
                <Route path="/admin/cursos" element={<Curso />} />

                {/* plataforma-professor */}
                <Route path="/perfil-professor" element={<Perfil/>}/>
                <Route path="/login-professor" element={<LoginProfessor/>}/>
                <Route path="/cadastro-professor" element={<CadastroProfessor/>}/>
                <Route path="/curso-setup" element={<CursoSetup/>}/>
                <Route path="/meus-cursos" element={<MeusCursos/>}/>
                <Route path="/ajuda" element={<Ajuda/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
