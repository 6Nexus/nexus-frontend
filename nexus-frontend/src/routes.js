import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./site-institucional/page/Home/Home";
import Login from "./site-institucional/page/Login/Login";
import Cadastro from "./site-institucional/page/Cadastro/Cadastro";
    function Rotas() {
        return (
            <>
                <BrowserRouter>
                <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro/>}/>
                </Routes>
                </BrowserRouter>
            </>
        )
    }
export default Rotas;