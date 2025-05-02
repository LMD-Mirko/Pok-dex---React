import React from 'react';
import { ThemeProvider } from 'styled-components';
import { tema } from './estilos/tema';
import { GlobalStyle } from './estilos/EstilosGlobales';
import Rutas from './rutas/Rutas';

const App = () => {
  return (
    <ThemeProvider theme={tema}>
      <GlobalStyle />
      <Rutas />
    </ThemeProvider>
  );
};

export default App;
