import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './plataforma-professor/paginas/Login/Login';
import Cadastro from './plataforma-professor/paginas/Cadastro/Cadastro';
import Perfil from './plataforma-professor/paginas/Perfil/Perfil';
import SideBar from './plataforma-professor/componentes/SideBar/SideBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Login /> */}
    {/* <Cadastro/> */}
    <Perfil/>
    {/* <SideBar/> */}
  </React.StrictMode>
);

