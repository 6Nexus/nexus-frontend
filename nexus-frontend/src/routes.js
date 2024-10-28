import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Professor from "./plataforma-admin/pages/Professor/Professor";
import Mae from "./plataforma-admin/pages/Mae/Mae";
import Curso from "./plataforma-admin/pages/Curso/Curso";



function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Professores" element={<Professor />} />
                <Route path="/Maes" element={<Mae />} />
                <Route path="/Cursos" element={<Curso />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;