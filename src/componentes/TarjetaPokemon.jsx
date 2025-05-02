import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { tema } from '../estilos/tema';

const tiposTraducidos = {
  water: 'agua',
  fire: 'fuego',
  grass: 'planta',
  electric: 'electrico',
  poison: 'veneno',
  psychic: 'psiquico',
  ground: 'tierra',
  ice: 'hielo',
  ghost: 'fantasma',
  dragon: 'dragon',
  steel: 'acero',
  normal: 'normal',
  flying: 'volador',
  rock: 'roca',
  bug: 'bicho',
  fighting: 'lucha',
  fairy: 'hada',
  dark: 'siniestro'
};

const getColorTipo = (tipo) => {
  if (!tipo) return tema.colores.tipos.normal;
  const tipoTraducido = tiposTraducidos[tipo.toLowerCase()];
  return tema.colores.tipos[tipoTraducido] || tema.colores.tipos.normal;
};

const floatParticle = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100px) scale(0); opacity: 0; }
`;

const rotateBackground = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.3);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const twinkle = keyframes`
  0%, 100% { 
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% { 
    opacity: 1;
    transform: scale(1.2);
  }
`;

const moveStars = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-1000px) rotate(360deg);
  }
`;

const pulseNebula = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1) rotate(0deg);
    filter: blur(3px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2) rotate(180deg);
    filter: blur(5px);
  }
`;

const TarjetaContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: ${props => {
    const color = getColorTipo(props.tipo);
    return color.startsWith('#') 
      ? `linear-gradient(135deg, 
          ${color}ff 0%, 
          ${color}ff 30%,
          ${color}ee 70%, 
          ${color}dd 100%)`
      : color;
  }};
  border-radius: 1rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    0 0 25px ${props => `${getColorTipo(props.tipo)}aa`};
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(
        circle at center,
        ${props => `${getColorTipo(props.tipo)}cc`} 0%,
        transparent 70%
      ),
      radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.7) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 70%,
        rgba(255, 255, 255, 0.7) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 50% 50%,
        rgba(255, 255, 255, 0.5) 0%,
        transparent 60%
      );
    animation: ${rotateBackground} 15s linear infinite;
    z-index: 1;
    filter: blur(2px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background-image: 
      radial-gradient(1.5px 1.5px at 20px 30px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 40px 70px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 50px 160px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 90px 40px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 130px 80px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 160px 120px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 200px 50px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 240px 90px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 280px 130px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 320px 170px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 350px 110px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 380px 140px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 400px 80px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 430px 160px, #fff 100%, transparent),
      radial-gradient(1.5px 1.5px at 460px 120px, #fff 100%, transparent);
    background-repeat: repeat;
    animation: ${moveStars} 20s linear infinite;
    opacity: 0.6;
    z-index: 2;
    filter: blur(0.5px);
  }

  .nebula {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(
        circle at 20% 20%,
        ${props => `${getColorTipo(props.tipo)}cc`} 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        ${props => `${getColorTipo(props.tipo)}cc`} 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 50% 50%,
        ${props => `${getColorTipo(props.tipo)}aa`} 0%,
        transparent 70%
      );
    animation: ${pulseNebula} 6s ease-in-out infinite;
    z-index: 3;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background-image: 
      radial-gradient(2.5px 2.5px at 50px 50px, #fff 100%, transparent),
      radial-gradient(2.5px 2.5px at 100px 100px, #fff 100%, transparent),
      radial-gradient(2.5px 2.5px at 150px 150px, #fff 100%, transparent),
      radial-gradient(2.5px 2.5px at 200px 200px, #fff 100%, transparent),
      radial-gradient(2.5px 2.5px at 250px 250px, #fff 100%, transparent),
      radial-gradient(2.5px 2.5px at 300px 150px, #fff 100%, transparent),
      radial-gradient(2.5px 2.5px at 350px 100px, #fff 100%, transparent),
      radial-gradient(2.5px 2.5px at 400px 200px, #fff 100%, transparent);
    background-repeat: repeat;
    animation: ${moveStars} 15s linear infinite;
    opacity: 0.4;
    z-index: 4;
    pointer-events: none;
    filter: blur(1px);
  }

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 
      0 15px 50px rgba(0, 0, 0, 0.25),
      0 0 50px ${props => `${getColorTipo(props.tipo)}cc`};

    &::before {
      animation: ${rotateBackground} 8s linear infinite;
    }

    &::after {
      animation: ${moveStars} 10s linear infinite;
    }

    .nebula {
      animation: ${pulseNebula} 3s ease-in-out infinite;
    }

    .particles {
      animation: ${moveStars} 7s linear infinite;
    }
  }
`;

const ImagenContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const ImagenPokemon = styled.img`
  width: auto;
  height: auto;
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));

  ${TarjetaContainer}:hover & {
    transform: scale(1.1);
  }
`;

const NombrePokemon = styled.h3`
  font-family: ${tema.fuentes.secundaria};
  color: ${tema.colores.texto};
  text-align: center;
  margin-bottom: 1rem;
  text-transform: capitalize;
  font-size: 1.2rem;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

const TiposContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  z-index: 3;
`;

const TipoChip = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  background: ${props => `${getColorTipo(props.$tipo)}33`};
  color: ${tema.colores.texto};
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  border: 1px solid ${props => `${getColorTipo(props.$tipo)}66`};
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px ${props => `${getColorTipo(props.$tipo)}33`};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px ${props => `${getColorTipo(props.$tipo)}66`};
  }
`;

const TarjetaPokemon = React.memo(({ pokemon, onClick }) => {
  const tipoPrincipal = pokemon.types[0]?.type.name || 'normal';

  return (
    <TarjetaContainer
      tipo={tipoPrincipal}
      onClick={() => onClick(pokemon)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="nebula" />
      <div className="particles" />
      <ImagenContainer>
        <ImagenPokemon
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          loading="lazy"
        />
      </ImagenContainer>
      <NombrePokemon>{pokemon.name}</NombrePokemon>
      <TiposContainer>
        {pokemon.types.map((tipo, index) => (
          <TipoChip
            key={index}
            $tipo={tipo.type.name}
          >
            {tipo.type.name}
          </TipoChip>
        ))}
      </TiposContainer>
    </TarjetaContainer>
  );
});

export default TarjetaPokemon; 