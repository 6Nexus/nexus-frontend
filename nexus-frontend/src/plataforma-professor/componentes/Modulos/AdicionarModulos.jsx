import React, { useState } from 'react';
import './AdicionarModulos.css';
import AdicionarAula from '../Aulas/AdicionarAulas';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function AdicionarModulos({ moduloIndex, AdicionarModulo, removerModulo }) {
  const [modulo, setModulo] = useState({
    titulo: '',
    descricao: '',
    aulas: []
  });

  const handleChangeModulo = (e) => {
    const { name, value } = e.target;
    setModulo((prevModulo) => ({
      ...prevModulo,
      [name]: value
    }));
  };

  const handleAddAula = () => {
    const novaAula = { titulo: '', descricao: '' };
    setModulo((prevModulo) => {
      const updatedModulo = {
        ...prevModulo,
        aulas: [...prevModulo.aulas, novaAula]
      };
      AdicionarModulo(updatedModulo);
      return updatedModulo;
    });
  };

  const handleRemoveModulo = () => {
    removerModulo(moduloIndex);
    console.log('Módulo removido')
  };

  return (
    <div className="container-modulo">
      <div className='container-header'>
        <h3>Módulo {moduloIndex}</h3>
        <button className='btn-remover-modulo' onClick={handleRemoveModulo}>
          <CloseRoundedIcon /> {/* icone de remover modulo */}
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="titulo">Título do Módulo:</label>
        <input
          type="text"
          id="titulo"
          name='titulo'
          value={modulo.titulo}
          onChange={handleChangeModulo}
          placeholder="Digite o título do módulo"
          // required
          className="input-field"
          style={{ width: '40%' }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="descricao">Descrição do Módulo:</label>
        <textarea
          id="descricao"
          name='descricao'
          value={modulo.descricao}
          onChange={handleChangeModulo}
          placeholder="Digite a descrição do módulo"
          // required
          className="textarea-field"
        />
      </div>

      <button className='btn-add-aula' onClick={handleAddAula}>
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
              AdicionarModulo(updatedModulo);
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
              AdicionarModulo(updatedModulo);
              return updatedModulo;
            });
          }}
        />
      ))}
    </div>
  );
}

export default AdicionarModulos;
