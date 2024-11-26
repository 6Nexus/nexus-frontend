import React, { useState } from 'react';
import './AdicionarModulos.css';
import AdicionarAula from '../Aulas/AdicionarAulas';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import Questionario from '../Questionario/Questionario';

function AdicionarModulos({ moduloIndex, atualizarModulo, removerModulo }) {
    const [modulo, setModulo] = useState({
        titulo: '',
        descricao: '',
        aulas: [],
        questionario: []
    });

    const handleChangeModulo = (e) => {
        const { name, value } = e.target;
        setModulo((prevModulo) => {
            const updatedModulo = { ...prevModulo, [name]: value };
            atualizarModulo(moduloIndex, updatedModulo); 
            return updatedModulo;
        });
    };

    const handleAddAula = () => {
        const novaAula = { titulo: '', descricao: '', conteudos: { video: '' } };
        setModulo((prevModulo) => {
            const updatedModulo = {
                ...prevModulo,
                aulas: [...prevModulo.aulas, novaAula]
            };
            atualizarModulo(moduloIndex, updatedModulo); 
            return updatedModulo;
        });
    };

    const handleRemoverModulo = () => {
        removerModulo(moduloIndex); 
    };

    const [mostrarQuestionario, setMostrarQuestionario] = useState(false);

    const toggleQuestionario = () => {
        setMostrarQuestionario((prevMostrar) => !prevMostrar);
    }; 

    const handleSalvarQuestionario = (questoes) => {
        setModulo((prevModulo) => {
            const updatedModulo = { 
                ...prevModulo,
                questionario: questoes // Atualiza o questionário com as questões
            };
            atualizarModulo(moduloIndex, updatedModulo); // Atualiza o módulo no estado do componente pai
            return updatedModulo;
        });
        setMostrarQuestionario(false); // Fecha o modal de questionário
    };

    return (
        <div className="container-modulo">
            <div className='container-header'>
                <h3>Módulo {moduloIndex + 1}</h3>
                <button className='btn-remover' onClick={handleRemoverModulo}>
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
                    onChange={handleChangeModulo}
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
                    onChange={handleChangeModulo}
                    placeholder="Digite a descrição do módulo"
                    className="input-descricao"
                />
            </div>

            <button type="button" className='btn-add-aula' onClick={handleAddAula}>
                + Aula
            </button>

            {modulo.aulas.map((aula, index) => (
                <AdicionarAula
                    key={index}
                    aulaIndex={index + 1}
                    aula={aula}
                    AdicionarAula={(novaAula) => {
                        const aulasAtualizadas = modulo.aulas.map((a, i) =>
                            i === index ? novaAula : a
                        );
                        setModulo((prevModulo) => {
                            const updatedModulo = {
                                ...prevModulo,
                                aulas: aulasAtualizadas
                            };
                            atualizarModulo(moduloIndex, updatedModulo);
                            return updatedModulo;
                        });
                    }}
                    removerAula={() => {
                        const aulasAtualizadas = modulo.aulas.filter((_, i) => i !== index);
                        setModulo((prevModulo) => {
                            const updatedModulo = {
                                ...prevModulo,
                                aulas: aulasAtualizadas
                            };
                            atualizarModulo(moduloIndex, updatedModulo);
                            return updatedModulo;
                        });
                    }}
                />
            ))}

            <button type='button' className='criar-questionario' onClick={toggleQuestionario}>
                <QuizRoundedIcon /> Criar Questionário
            </button>

            {mostrarQuestionario && <Questionario onClose={toggleQuestionario} onSave={handleSalvarQuestionario} />}
        </div>
    );
}

export default AdicionarModulos;
