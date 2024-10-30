import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./site-institucional/page/Home/Home";
import Login from "./site-institucional/page/Login/Login";
    function Rotas() {
        return (
            <>
                <BrowserRouter>
                <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                </Routes>
                </BrowserRouter>
            </>
        )
    }
export default Rotas;