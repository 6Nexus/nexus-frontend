import React from 'react';
import ReactDOM from 'react-dom/client';
import Rotas from './routes'; 
import './global.css';
import { NavigationProvider } from './NavigationContext'; // Importando o contexto de navegação

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <NavigationProvider>
      <Rotas />
    </NavigationProvider>
  // </React.StrictMode>
);
