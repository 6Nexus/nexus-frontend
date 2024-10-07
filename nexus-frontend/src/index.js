import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './site-institucional/page/Home/Home'
import './utils/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

