import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokedex from '../paginas/Pokedex';
import PaginaNoEncontrada from '../componentes/PaginaNoEncontrada';

const Rutas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>
    </Router>
  );
};

export default Rutas; 