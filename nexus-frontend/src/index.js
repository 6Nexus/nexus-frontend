import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css'

import Home from './plataforma-mae/pages/Home/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

