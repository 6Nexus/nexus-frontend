import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./plataforma-mae/pages/Home/Home";
import Course from "./plataforma-mae/pages/Course/Course";
import Instructions from "./plataforma-mae/pages/Instructions/Instructions";
import ProfileSettings from "./plataforma-mae/pages/ProfileSettings/ProfileSettings";
import Certificates from "./plataforma-mae/pages/Certificates/Certificates";
import SavedCourses from "./plataforma-mae/pages/SavedCourses/SavedCourses";
import SideBar from './plataforma-mae/components/SideBar/SideBar'; // Componente SideBar que usa useNavigate
import Perfil from "./plataforma-professor/paginas/Perfil/Perfil";
import Login from './plataforma-professor/paginas/Login/Login';

function Rotas() {
    return (
        <BrowserRouter>
            {/* <SideBar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cursos" element={<Course />} />
                <Route path="/instrucoes" element={<Instructions />} />
                <Route path="/perfil" element={<ProfileSettings />} />
                <Route path="/certificados" element={<Certificates />} />
                <Route path="/cursos-salvos" element={<SavedCourses />} />

                {/* rotas plataforma-professor */}
                <Route path="/perfil-professor" element={<Perfil/>}/>
                <Route path="/login-professor" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
