import React, { useState } from 'react';
import './AdicionarModulos.css';

const AdicionarModulos = ({moduloIndex}) => {

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');



  return (
    <div className="container-modulo">
      <div className="form-group">
      <h3>Módulo {moduloIndex}</h3>
        <label htmlFor="titulo">Título do Módulo:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título do módulo"
          required
          className="input-field"
          style={{width: '40%'}}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descricao">Descrição do Módulo:</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição do módulo"
          required
          className="textarea-field"
        />
      </div>
      {/* <hr /> */}
    </div>
  );
};

export default AdicionarModulos;
