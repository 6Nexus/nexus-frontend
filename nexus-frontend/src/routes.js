import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./plataforma-mae/pages/Home/Home";
import Course from "./plataforma-mae/pages/Course/Course";
import CourseDetails from './plataforma-mae/pages/Course/CourseDetails'
import Questionnaire from "./plataforma-mae/pages/Questionnaire/Questionnaire";
import Instructions from "./plataforma-mae/pages/Instructions/Instructions";
import ProfileSettings from "./plataforma-mae/pages/ProfileSettings/ProfileSettings";
import Certificates from "./plataforma-mae/pages/Certificates/Certificates";
import SavedCourses from "./plataforma-mae/pages/SavedCourses/SavedCourses";

import Perfil from "./plataforma-professor/paginas/Perfil/Perfil";
import Login from './plataforma-professor/paginas/Login/Login';
import Cadastro from "./plataforma-professor/paginas/Cadastro/Cadastro";
import CursoSetup from "./plataforma-professor/paginas/CursoSetup/CursoSetup";
import MeusCursos from "./plataforma-professor/paginas/MeusCursos/MeusCursos";
import Ajuda from "./plataforma-professor/paginas/Ajuda/Ajuda";


function Rotas() {

    

    return (
        <BrowserRouter>
            <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/cursos" element={<Course />} />
                <Route path="/cursos/:idCurso" element={<CourseDetails />} />
                <Route path="/questionario/:idCurso" element={<Questionnaire />} />
                <Route path="/instrucoes" element={<Instructions />} />
                <Route path="/perfil" element={<ProfileSettings />} />
                <Route path="/certificados" element={<Certificates />} />
                <Route path="/cursos-salvos" element={<SavedCourses />} />

                {/* rotas plataforma-professor */}
                <Route path="/perfil-professor" element={<Perfil/>}/>
                <Route path="/login-professor" element={<Login/>}/>
                <Route path="/cadastro-professor" element={<Cadastro/>}/>
                <Route path="/curso-setup" element={<CursoSetup/>}/>
                <Route path="/meus-cursos" element={<MeusCursos/>}/>
                <Route path="/ajuda" element={<Ajuda/>}/>
                

            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
