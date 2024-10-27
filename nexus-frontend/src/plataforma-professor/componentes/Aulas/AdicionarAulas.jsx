import React, { useState } from 'react';
import './AdicionarAulas.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function AdicionarAula({ aulaIndex, AdicionarAula, removerAula }) {
    const [aula, setAula] = useState({
        titulo: '',
        descricao: ''
    });

    const handleChangeAula = (e) => {
        const { name, value } = e.target;
        setAula((prevAula) => {
            const updatedAula = {
                ...prevAula,
                [name]: value
            };
            
            AdicionarAula(updatedAula); 
            return updatedAula; 
        });
    };


    const handleRemoverAula = () => {
        removerAula(aulaIndex);
        console.log('Aula removida');
    };

    return (
        <div className='container-aulas'>
            <div className='container-header'>
                <h3>Aula {aulaIndex}</h3>
                <button className='btn-remover' onClick={handleRemoverAula}>
                    <CloseRoundedIcon />
                </button>
            </div>


            <div className="form-group">
                <label htmlFor="titulo">Título da Aula:</label>
                <input
                    type="text"
                    id="titulo"
                    name='titulo'
                    value={aula.titulo}
                    onChange={handleChangeAula}
                    placeholder="Digite o título da aula"
                    required
                    className="input-field"
                    style={{ width: '40%' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="descricao">Descrição da Aula:</label>
                <textarea
                    id="descricao"
                    name='descricao'
                    value={aula.descricao}
                    onChange={handleChangeAula}
                    placeholder="Digite a descrição da aula"
                    required
                    className="textarea-field"
                />
            </div>
            <div>
                conteudos
                <input type="file" className='video' />
                <input type="file" className='video' />
                <input type="file" className='video' />
            </div>
            <hr />
        </div>
    );
}

export default AdicionarAula;
