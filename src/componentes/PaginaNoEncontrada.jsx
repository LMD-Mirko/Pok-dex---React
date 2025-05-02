import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { tema } from '../estilos/tema';

const ContenedorNoEncontrado = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #13151a 0%, #1a1c23 100%);
  padding: 2rem;
  text-align: center;
`;

const ImagenPsyduck = styled(motion.img)`
  width: 300px;
  height: 300px;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 20px rgba(255, 196, 12, 0.3));

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Titulo = styled(motion.h1)`
  font-size: 4rem;
  color: ${tema.colores.texto};
  margin-bottom: 1rem;
  font-family: ${tema.fuentes.primaria};
  text-shadow: 0 0 20px rgba(255, 196, 12, 0.5);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Mensaje = styled(motion.p)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  font-family: ${tema.fuentes.secundaria};
`;

const BotonRegreso = styled(motion.button)`
  background: rgba(255, 196, 12, 0.1);
  border: 2px solid rgba(255, 196, 12, 0.5);
  border-radius: ${tema.bordes.radio};
  color: ${tema.colores.texto};
  padding: ${tema.espaciado.md} ${tema.espaciado.xl};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all ${tema.animaciones.rapida};
  font-family: ${tema.fuentes.secundaria};
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 196, 12, 0.2);
    border-color: rgba(255, 196, 12, 0.8);
    box-shadow: 0 0 20px rgba(255, 196, 12, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PaginaNoEncontrada = () => {
  const navegar = useNavigate();

  return (
    <ContenedorNoEncontrado
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ImagenPsyduck
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
        alt="Psyduck confundido"
        initial={{ y: -50, rotate: -5 }}
        animate={{ 
          y: 0,
          rotate: [0, -5, 5, -5, 0],
          transition: {
            y: { duration: 0.5 },
            rotate: { 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }
        }}
      />
      <Titulo
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        ¡Oops! Página no encontrada
      </Titulo>
      <Mensaje
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Parece que te has perdido en el mundo Pokémon. 
        ¡Incluso Psyduck está confundido! 
        Da la vuelta.
      </Mensaje>
      <BotonRegreso
        onClick={() => navegar('/')}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Volver al Inicio
      </BotonRegreso>
    </ContenedorNoEncontrado>
  );
};

export default PaginaNoEncontrada; 