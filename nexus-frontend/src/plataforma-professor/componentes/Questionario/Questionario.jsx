import React, { useState } from 'react';
import './Questionario.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { toast } from 'react-toastify';

function Questao({ moduloIndex, perguntaIndex, pergunta, atualizarPergunta, atualizarResposta }) {
    const handlePerguntaChange = (e) => {
        const { name, value } = e.target;
        atualizarPergunta(moduloIndex, perguntaIndex, name, value);
    };

    const handlePerguntaRemove = () => {
        atualizarPergunta(moduloIndex, perguntaIndex, 'delete', '');
    };

    const handleRepostaAdd = () => {
        atualizarResposta(moduloIndex, perguntaIndex, -1, '', '');
    };

    const handleRespostaChange = (respostaIndex, e) => {
        const { name, value, type } = e.target;
        atualizarResposta(moduloIndex, perguntaIndex, respostaIndex, name, value, type);
    };

    const handleRepostaRemove = (respostaIndex) => {
        atualizarResposta(moduloIndex, perguntaIndex, respostaIndex, 'delete', '', '');
    };


    return (
        <div className="question-container">
            <div className='header-questao'>
                <h4>Questão {perguntaIndex + 1}</h4>

                <button className="btn-remover" type="button" onClick={handlePerguntaRemove}>
                    <CloseRoundedIcon />
                </button>
            </div>
            <input
                type="text"
                className="question-input"
                name="pergunta"
                value={pergunta.pergunta}
                onChange={handlePerguntaChange}
                placeholder="Digite a pergunta"
            />
            <button className="btn-add-alternativa" type="button" onClick={handleRepostaAdd}>
                + Alternativa
            </button>
            {pergunta.respostas.map((resposta, index) => (
                <div key={index} className="container-alternativa">
                    <input
                        type="text"
                        className="alternative-input"
                        name="resposta"
                        value={resposta.resposta}
                        onChange={(e) => (handleRespostaChange(index, e))}
                        placeholder="Digite a alternativa"
                    />

                    <input
                        type="radio"
                        name="respostaCerta"
                        value={true}
                        checked={resposta.respostaCerta}
                        onChange={(e) => (handleRespostaChange(index, e))}
                    /> Correta

                    <button className="btn-remover" type="button" onClick={() => handleRepostaRemove(index)}>
                        <CloseRoundedIcon />
                    </button>

                </div>
            ))}

        </div>
    );
}

function Questionario({ moduloIndex, questionario, atualizarPergunta, atualizarResposta, onClose }) {
    const handlePerguntaAdd = () => {
        atualizarPergunta(moduloIndex, -1, '', '')
    };

    return (
        <div className='container-questionario'>

            <div className="questionario">
                <div className='header-questionario'>
                    <h2>Criar Questionário</h2> <br />
                    <button type="button" className='btn-fechar-questionario' onClick={onClose}>
                        <CloseRoundedIcon />
                    </button>
                </div>
                {questionario.perguntas.map((pergunta, index) => (
                    <Questao
                        key={index}
                        moduloIndex={moduloIndex}
                        perguntaIndex={index}
                        pergunta={pergunta}
                        atualizarPergunta={atualizarPergunta}
                        atualizarResposta={atualizarResposta}
                    />
                ))}
                
                <button type="button" className='btn-add-questao' onClick={handlePerguntaAdd}>Adicionar Questão</button>
            </div>
        </div>
    );
}

export default Questionario;
