import React, {useState, useEffect} from 'react';
import stylesTitulos from './Titulos.module.css';

function Titulos({ tipo, mostrarCards }) {
    const getTituloInicial = () => {
        if (tipo.includes('professor')) return 'emAprovacao-professor';
        if (tipo.includes('aluno')) return 'ativos-aluno';
        if (tipo.includes('curso')) return 'ativos-curso';
        return '';
    };

    const [tituloAtivo, setTituloAtivo] = useState(getTituloInicial());

    useEffect(() => {
        mostrarCards(tituloAtivo); // Mostra os cards do título inicial
    }, [tituloAtivo, mostrarCards]);

    const handleTituloClick = (titulo) => {
        setTituloAtivo(titulo);
        mostrarCards(titulo);
    };
    const containerClass = tipo.includes('professor') ? stylesTitulos.titulosContainer : 
                          tipo.includes('aluno') ? stylesTitulos.titulosContainer :
                          tipo.includes('curso') ? stylesTitulos.titulosContainer : 
                          '';

    return (
        <div id={`titulos-${tipo}`}>
            <div className={containerClass}>
                {tipo.includes('professor') && (
                    <>
                        <div className={stylesTitulos.titulos}>
                            <div className={stylesTitulos.subItem} onClick={() => handleTituloClick('emAprovacao-professor')}>
                                <p style={{ color: tituloAtivo === 'emAprovacao-professor' ? '#66AF53' : '#000' }}>Em Aprovação</p>
                                <div className={stylesTitulos.divVerde}></div>
                            </div>
                            <div className={stylesTitulos.subItem} onClick={() => handleTituloClick('aprovados-professor')}>
                                <p style={{ color: tituloAtivo === 'aprovados-professor' ? '#66AF53' : '#000' }}>Aprovados</p>
                                <div className={stylesTitulos.divVerde}></div>
                            </div>
                            {/* <div className={stylesTitulos.subItem} onClick={() => handleTituloClick('bloqueados-professor')}>
                                <p style={{ color: tituloAtivo === 'bloqueados-professor' ? '#66AF53' : '#000' }}>Bloqueados</p>
                            </div> */}
                        </div>
                        
                    </>
                )}

                {tipo.includes('aluno') && (
                    <>
                        <div className={stylesTitulos.titulos}>
                            <div className={stylesTitulos.subItem} onClick={() => handleTituloClick('ativos-aluno')}>
                                <p style={{ color: tituloAtivo === 'ativos-aluno' ? '#66AF53' : '#000' }}>Ativos</p>
                                <div className={stylesTitulos.divVerde}></div>
                            </div>
                            <div className={stylesTitulos.subItem} onClick={() => handleTituloClick('bloqueados-aluno')}>
                                <p style={{ color: tituloAtivo === 'bloqueados-aluno' ? '#66AF53' : '#000' }}>Bloqueados</p>
                            </div>
                        </div> 
                    </>
                )}

                {tipo.includes('curso') && (
                    <>
                        <div className={stylesTitulos.titulos}>
                            <div className={stylesTitulos.subItem} onClick={() => handleTituloClick('ativos-curso')}>
                                <p style={{ color: tituloAtivo === 'ativos-curso' ? '#66AF53' : '#000' }}>Ativos</p>
                                <div className={stylesTitulos.divVerde}></div>
                            </div>
                            <div className={stylesTitulos.subItem} onClick={() => handleTituloClick('bloqueados-curso')}>
                                <p style={{ color: tituloAtivo === 'bloqueados-curso' ? '#66AF53' : '#000' }}>Bloqueados</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Titulos;