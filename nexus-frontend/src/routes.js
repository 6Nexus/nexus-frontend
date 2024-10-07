import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './plataforma-admin/componentes/NavBar/NavBar'; // importe seu componente NavBar
import Card from './plataforma-admin/componentes/Card/Card'; // seu componente de cards (opcional, se você precisar)
import './utils/global.css'; // seu CSS para estilos


function Rotas() {
    const alunoDenunciados = [
        { foto: 'foto-perfil.png', nome: 'Maria Denunciado', email: 'MariaSilva@email.com', telefone: '(11) 2934-56546' },
        // ...outros dados
    ];

    const alunoAtivos = [
        { foto: 'foto-perfil.png', nome: 'Maria Ativo', email: 'MariaSilva@email.com', telefone: '(11) 2934-56546' },
        // ...outros dados
    ];

    const alunoBloqueados = [
        { foto: 'foto-perfil.png', nome: 'Maria Bloqueado', email: 'MariaSilva@email.com', telefone: '(11) 2934-56546' },
        // ...outros dados
    ];

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<h1>Bem-vindo ao Sistema!</h1>} />
                <Route
                    path="/denunciados"
                    element={
                        <div>
                            <h1>Alunos Denunciados</h1>
                            <div className="card-container">
                                {alunoDenunciados.map((dado, index) => (
                                    <Card key={index} {...dado} />
                                ))}
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/ativos"
                    element={
                        <div>
                            <h1>Alunos Ativos</h1>
                            <div className="card-container">
                                {alunoAtivos.map((dado, index) => (
                                    <Card key={index} {...dado} />
                                ))}
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/bloqueados"
                    element={
                        <div>
                            <h1>Alunos Bloqueados</h1>
                            <div className="card-container">
                                {alunoBloqueados.map((dado, index) => (
                                    <Card key={index} {...dado} />
                                ))}
                            </div>
                        </div>
                    }
                />
            </Routes>
        </Router>
        )
}
export default Rotas;