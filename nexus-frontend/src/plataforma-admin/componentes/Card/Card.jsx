import React from 'react';

function Card({ dado, tipoSelecionado }) {
    let botaoHTML;

    if (tipoSelecionado === 'emAprovacao-professor') {
        botaoHTML = (
            <div className="div-btn">
                <button className="btn">Aprovar</button>
                <button className="btn-bloq">Recusar</button>
            </div>
        );
    } else if (tipoSelecionado === 'aprovados-professor') {
        botaoHTML = (
            <div className="div-btn">
                <button className="btn-ativo">Bloquear</button>
            </div>
        );
    } else if (tipoSelecionado === 'denunciados-professor') {
        botaoHTML = (
            <div className="div-btn">
                <button className="btn">Acessar</button>
                <button className="btn-bloq">Bloquear</button>
            </div>
        );
    } else if (tipoSelecionado === 'bloqueados-professor') {
        botaoHTML = (
            <div className="div-btn">
                <button className="btn">Desbloquear</button>
            </div>
        );
    } 
    
    else if (tipoSelecionado === 'ativados-alunos') {
        botaoHTML = (
            <div className="div-btn">
                <button className="btn">Bloquear</button>
            </div>
        );
    } else if (tipoSelecionado === 'denunciados-alunos') {
        botaoHTML = (
            <div className="div-btn">
                <button className="btn">Acessar</button>
                <button className="btn-bloq">Bloquear</button>
            </div>
        );
    } else if (tipoSelecionado === 'bloqueados-alunos') {
        botaoHTML = (
            <div className="div-btn">
                <button className="btn">Desbloquear</button>
            </div>
        );
    }


    return (
        <div className="card">
            {dado.fotoCanto && (
                <img src={dado.fotoCanto} className="fotoCanto" alt="foto canto" />
            )}
            {dado.foto && <img src={dado.foto} alt={dado.nome} className="foto" />}
            <h2 className="nome">{dado.nome}</h2>
            {dado.email && (
                <>
                    <p className="p-title">Email:</p>
                    <p>{dado.email}</p>
                </>
            )}
            {dado.telefone && (
                <>
                    <p className="p-title">Telefone:</p>
                    <p>{dado.telefone}</p>
                </>
            )}
            {dado.atuacao && (
                <>
                    <p className="p-title">Área de atuação:</p>
                    <p>{dado.atuacao}</p>
                </>
            )}
            {dado.professor && (
                <>
                    <p className="p-title">Professor:</p>
                    <p>{dado.professor}</p>
                </>
            )}
            {botaoHTML} {/* Renderiza os botões */}
        </div>
    );
};

export default Card;