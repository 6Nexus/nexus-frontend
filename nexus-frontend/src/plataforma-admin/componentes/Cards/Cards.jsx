import React from 'react';
import Card from '../Card/Card';

const Cards = ({ dados, tipoSelecionado }) => {
    return (
        <div id="card-container">
            {dados.map((dado, index) => (
                <Card key={index} dado={dado} tipoSelecionado={tipoSelecionado} />
            ))}
        </div>
    );
};

export default Cards;