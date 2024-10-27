import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./plataforma-mae/pages/Home/Home";
import Course from "./plataforma-mae/pages/Course/Course";
import CourseDetails from './plataforma-mae/pages/Course/CourseDetails';
import CourseModules from "./plataforma-mae/pages/Course/CourseModules";
import Questionnaire from "./plataforma-mae/pages/Questionnaire/Questionnaire";
import Instructions from "./plataforma-mae/pages/Instructions/Instructions";
import ProfileSettings from "./plataforma-mae/pages/ProfileSettings/ProfileSettings";
import Certificates from "./plataforma-mae/pages/Certificates/Certificates";
import SavedCourses from "./plataforma-mae/pages/SavedCourses/SavedCourses";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cursos" element={<Course />} />
                <Route path="/cursos/:idCurso/modulos" element={<CourseModules />} />
                <Route path="/cursos/:idCurso/modulos/:idModulo" element={<CourseDetails />} />
                <Route path="/questionario/:idCurso" element={<Questionnaire />} />
                <Route path="/instrucoes" element={<Instructions />} />
                <Route path="/perfil" element={<ProfileSettings />} />
                <Route path="/certificados" element={<Certificates />} />
                <Route path="/cursos-salvos" element={<SavedCourses />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
