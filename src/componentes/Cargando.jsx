import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { tema } from '../estilos/tema';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 30px rgba(111, 53, 252, 0.6);
  }
  50% {
    box-shadow: 0 0 50px rgba(111, 53, 252, 0.8);
  }
`;

const starFloat = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2000px);
  }
`;

const CargandoContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;
  z-index: 1000;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: 
      radial-gradient(1px 1px at 20px 30px, #fff 100%, transparent),
      radial-gradient(1px 1px at 40px 70px, #fff 100%, transparent),
      radial-gradient(1px 1px at 50px 160px, #fff 100%, transparent),
      radial-gradient(1px 1px at 90px 40px, #fff 100%, transparent),
      radial-gradient(1px 1px at 130px 80px, #fff 100%, transparent),
      radial-gradient(1px 1px at 160px 120px, #fff 100%, transparent);
    background-repeat: repeat;
    animation: ${starFloat} 150s linear infinite;
    opacity: 0.3;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(111, 53, 252, 0.1),
      transparent 100%
    );
  }
`;

const LoadingCircle = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  animation: ${float} 4s ease-in-out infinite;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: ${tema.colores.primario};
    border-right-color: ${tema.colores.secundario};
    animation: ${rotate} 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: ${tema.colores.primario};
    border-left-color: ${tema.colores.secundario};
    animation: ${rotate} 1.5s linear infinite reverse;
  }
`;

const PokebolaContainer = styled.div`
  position: absolute;
  top: 20px; /* Cambiado: ya no está centrado */
  left: 20px;
  width: 100px;
  height: 100px;
  animation: ${pulse} 2s ease-in-out infinite;
`;



const TextoCargando = styled.div`
  font-family: ${tema.fuentes.secundaria};
  font-size: 2.5rem;
  color: ${tema.colores.texto};
  margin-top: ${tema.espaciado.xl};
  text-transform: uppercase;
  letter-spacing: 8px;
  text-shadow: 
    0 0 10px ${tema.colores.primario},
    0 0 20px ${tema.colores.secundario},
    0 0 30px ${tema.colores.primario};
  position: relative;
  z-index: 2;

  &::after {
    content: '...';
    position: absolute;
    animation: ${pulse} 1.5s steps(4, end) infinite;
  }
`;

const Cargando = () => {
  return (
    <CargandoContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingCircle>
        <PokebolaContainer>
        </PokebolaContainer>
      </LoadingCircle>
      <TextoCargando>Cargando</TextoCargando>
    </CargandoContainer>
  );
};

export default Cargando;
