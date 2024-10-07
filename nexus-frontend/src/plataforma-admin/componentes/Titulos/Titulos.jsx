import React from 'react';
import stylesTitulos from './Titulos.module.css';

function Titulos({ tipo, mostrarCards }) {
    // Determina o container de títulos baseado no tipo
    const containerClass = tipo.includes('professor') ? stylesTitulos.titulosContainer : 
                          tipo.includes('aluno') ? stylesTitulos.titulosContainer :
                          tipo.includes('curso') ? stylesTitulos.titulosContainer : 
                          '';

    return (
        <div id={`titulos-${tipo}`}>
            <div className={containerClass}>
                {tipo.includes('professor') && (
                    <>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('emAprovacao-professor')}>
                            <p>Em Aprovação</p>
                            <div className={stylesTitulos.divVerde}></div>
                        </div>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('aprovados-professor')}>
                            <p>Aprovados</p>
                            <div className={stylesTitulos.divVerde}></div>
                        </div>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('denunciados-professor')}>
                            <p>Denunciados</p>
                            <div className={stylesTitulos.divVerde}></div>
                        </div>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('bloqueados-professor')}>
                            <p>Bloqueados</p>
                        </div>
                    </>
                )}

                {tipo.includes('aluno') && (
                    <>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('denunciados-aluno')}>
                            <p>Denunciados</p>
                            <div className={stylesTitulos.divVerde}></div>
                        </div>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('ativos-aluno')}>
                            <p>Ativos</p>
                            <div className={stylesTitulos.divVerde}></div>
                        </div>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('bloqueados-aluno')}>
                            <p>Bloqueados</p>
                        </div>
                    </>
                )}

                {tipo.includes('curso') && (
                    <>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('denunciados-curso')}>
                            <p>Denunciados</p>
                            <div className={stylesTitulos.divVerde}></div>
                        </div>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('ativos-curso')}>
                            <p>Ativos</p>
                            <div className={stylesTitulos.divVerde}></div>
                        </div>
                        <div className={stylesTitulos.subItem} onClick={() => mostrarCards('bloqueados-curso')}>
                            <p>Bloqueados</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Titulos;