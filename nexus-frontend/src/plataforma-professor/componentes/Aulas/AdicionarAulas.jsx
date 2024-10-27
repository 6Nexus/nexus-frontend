import React, { useState, useEffect } from 'react';
import './AdicionarAulas.css';


function AdicionarAula({ aulaIndex, AdicionarAula }) {

    const [aula, setAula] = useState({
        titulo: '',
        descricao: ''
    })

    const handleChangeAula = (e) => {
        const { name, value } = e.target;
        setAula((prevAula) => ({
            ...prevAula,
            [name]: value
        }));
    };

    useEffect(() => {
        AdicionarAula(aula);
    }, [aula, AdicionarAula]);


    return (
        <div className='container-aulas'>
            <div className="form-group">
                <h3>Aula {aulaIndex}</h3>
                <label htmlFor="titulo">Título da Aula:</label>
                <input
                    type="text"
                    id="titulo"
                    name='titulo'
                    value={aula.titulo}
                    onChange={handleChangeAula}
                    placeholder="Digite o título da aula"
                    // required
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
                    // required
                    className="textarea-field"
                />
            </div>
            <button className='btn-remove-aula'>
                Remover Aula
            </button>
        </div>
    )

}
export default AdicionarAula;