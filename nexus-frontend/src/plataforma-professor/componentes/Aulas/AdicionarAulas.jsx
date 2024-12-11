import React, { useState } from 'react';
import './AdicionarAulas.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

function AdicionarAula({ moduloIndex, aulaIndex, aula, atualizarAula}) {
    const handleAulaChange = (e) => {
        const { name, value } = e.target;
        if (name == "video") {
            atualizarAula(moduloIndex, aulaIndex, name, e.target.files[0]);
        } else {
            atualizarAula(moduloIndex, aulaIndex, name, value);
        }
    };

    const handleAulaRemove = () => {
        atualizarAula(moduloIndex, aulaIndex, 'delete', '');
    };

    return (
            <div className='container-aulas'>
                <div className='container-header'>
                    <h3>Aula {aulaIndex + 1}</h3>
                    <button className='btn-remover' onClick={handleAulaRemove}>
                        <CloseRoundedIcon />
                    </button>
                </div>
                <div className="form-group">
                    <label htmlFor="titulo">Título da Aula<span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        id="titulo"
                        name='titulo'
                        value={aula.titulo}
                        onChange={handleAulaChange}
                        placeholder="Digite o título da aula"
                        className="input-field"
                        style={{ width: '40%' }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição da Aula<span style={{ color: 'red' }}>*</span></label>
                    <input
                        id="descricao"
                        name='descricao'
                        value={aula.descricao}
                        onChange={handleAulaChange}
                        placeholder="Digite a descrição da aula"
                        className="input-descricao"
                    />
                </div>

                <div className="form-group">
                    <label>Adicionar Vídeo</label>
                    <input
                        type="file"
                        accept="video/*"
                        name="video"
                        onChange={handleAulaChange}
                    />
                </div>
            </div>
    );
}

export default AdicionarAula;
