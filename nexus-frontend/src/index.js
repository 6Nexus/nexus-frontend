import Routes from './routes';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Login from './plataforma-professor/paginas/Login/Login';
// import Cadastro from './plataforma-professor/paginas/Cadastro/Cadastro';
import Perfil from './plataforma-professor/paginas/Perfil/Perfil';



import Rotas from './routes'; 
import './global.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

     <Rotas /> 

  </React.StrictMode>
);

