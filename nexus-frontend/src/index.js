import React from 'react';
import ReactDOM from 'react-dom/client';
import Rotas from './routes'; 
import './global.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Rotas /> 
  </React.StrictMode>
);

