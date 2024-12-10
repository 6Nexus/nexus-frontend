    import React, { useState } from 'react';
    import './AdicionarModulos.css';
    import AdicionarAula from '../Aulas/AdicionarAulas';
    import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
    import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
    import Questionario from '../Questionario/Questionario';
    import api from '../../../api';
    import { toast } from 'react-toastify';
import ButtonNovoCurso from '../ButtonNovoCurso/ButtonNovoCurso';

    function AdicionarModulos({ moduloIndex, modulo, atualizarModulo, atualizarAula, atualizarPergunta, atualizarResposta
        // , removerModulo
    }) {
        const handleModuloChange = (e) => {
            const { name, value } = e.target;
            atualizarModulo(moduloIndex, name, value)
        };

        const handleModuloRemove = () => {

        };

        const handleAulaAdd = () => {
            atualizarAula(moduloIndex, -1, '', '')
        };

        const [mostrarQuestionario, setMostrarQuestionario] = useState(false);

        const toggleQuestionario = () => {
            setMostrarQuestionario((prevMostrar) => !prevMostrar);
        };


        return (
            <div className="container-modulo">
                <div className='container-header'>
                    <h3>Módulo {moduloIndex + 1}</h3>
                    <button className='btn-remover'
                    // onClick={handleModuloRemove}
                    >
                        <CloseRoundedIcon />
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="titulo">Título do Módulo<span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        id="titulo"
                        name='titulo'
                        value={modulo.titulo}
                        onChange={handleModuloChange}
                        placeholder="Digite o título do módulo"
                        className="input-field"
                        style={{ width: '40%' }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição do Módulo<span style={{ color: 'red' }}>*</span></label>
                    <input
                        id="descricao"
                        name='descricao'
                        value={modulo.descricao}
                        onChange={handleModuloChange}
                        placeholder="Digite a descrição do módulo"
                        className="input-descricao"
                    />
                </div>

                <button type="button" className='btn-add-aula' onClick={handleAulaAdd} >
                    + Aula
                </button>

                {modulo.aulas.map((aula, index) => (
                    <AdicionarAula
                        key={index}
                        moduloIndex={moduloIndex}
                        aulaIndex={index}
                        aula={aula}
                        atualizarAula={atualizarAula}
                        // removerAula=
                    />
                ))}

                <button type='button' className='criar-questionario' onClick={toggleQuestionario}>
                    <QuizRoundedIcon /> Criar Questionário
                </button>

                {mostrarQuestionario &&
                    <Questionario
                        moduloIndex={moduloIndex}
                        questionario={modulo.questionario}
                        atualizarPergunta={atualizarPergunta}
                        atualizarResposta={atualizarResposta}
                        // onSave={handleSalvarQuestionario}
                        onClose={toggleQuestionario}
                    />
                }
            </div>
        );
    }

    export default AdicionarModulos;
