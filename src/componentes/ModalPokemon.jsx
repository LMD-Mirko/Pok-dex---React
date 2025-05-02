import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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
  const tipoTraducido = tiposTraducidos[tipo.toLowerCase()] || 'normal';
  return tema.colores.tipos[tipoTraducido];
};

const getMaxStatValue = (statName) => {
  // Valores máximos reales de estadísticas base en Pokémon
  const maxStats = {
    'hp': 255,          // Blissey
    'attack': 190,      // Kartana
    'defense': 230,     // Shuckle
    'special-attack': 194,  // Deoxys (Attack Forme)
    'special-defense': 230, // Shuckle
    'speed': 200        // Regieleki
  };
  return maxStats[statName] || 255;
};

const formatStatName = (statName) => {
  const translations = {
    'hp': 'PS',
    'attack': 'Ataque',
    'defense': 'Defensa',
    'special-attack': 'Atq. Esp.',
    'special-defense': 'Def. Esp.',
    'speed': 'Velocidad'
  };
  return translations[statName] || statName;
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: ${tema.espaciado.lg};
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  background: ${props => getColorTipo(props.tipo)}22;
  border-radius: ${tema.bordes.radioGrande};
  padding: ${tema.espaciado.xl};
  max-width: 90%;
  width: 800px;
  min-height: 400px;
  display: grid;
  grid-template-columns: 40% 60%;
  gap: ${tema.espaciado.xl};
  box-shadow: 
    0 0 40px ${props => getColorTipo(props.tipo)}66,
    inset 0 0 20px ${props => getColorTipo(props.tipo)}44;
  border: 2px solid ${props => getColorTipo(props.tipo)}66;
  backdrop-filter: blur(20px);
  z-index: 10000;

  @media (max-width: ${tema.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    width: 95%;
    min-height: auto;
    padding: ${tema.espaciado.lg};
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${tema.espaciado.lg};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      ${props => getColorTipo(props.tipo)}66,
      transparent
    );
  }
`;

const ImagenContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${tema.espaciado.lg};
  border-radius: 50%;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle,
      ${props => getColorTipo(props.tipo)}44 0%,
      transparent 70%
    );
    animation: rotate 20s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 20px ${props => getColorTipo(props.tipo)}66;
    z-index: 3;
  }
`;

const ImagenPokemon = styled(motion.img)`
  width: 90%;
  height: 90%;
  object-fit: contain;
  filter: drop-shadow(0 0 20px ${props => getColorTipo(props.tipo)}66);
  z-index: 2;
  position: relative;
  transform-origin: center;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const NombrePokemon = styled.h2`
  font-family: ${tema.fuentes.secundaria};
  color: ${tema.colores.texto};
  text-align: center;
  font-size: 2.5rem;
  margin: ${tema.espaciado.md} 0;
  text-transform: capitalize;
  text-shadow: 0 0 20px ${props => getColorTipo(props.tipo)}cc;
  letter-spacing: 2px;
`;

const TiposContainer = styled.div`
  display: flex;
  gap: ${tema.espaciado.md};
  justify-content: center;
  margin: ${tema.espaciado.md} 0;
`;

const TipoChip = styled.span`
  padding: ${tema.espaciado.sm} ${tema.espaciado.lg};
  border-radius: ${tema.bordes.radioPequeno};
  background: ${props => getColorTipo(props.tipo)}33;
  color: ${tema.colores.texto};
  font-size: 0.9rem;
  text-transform: capitalize;
  backdrop-filter: blur(5px);
  border: 1px solid ${props => getColorTipo(props.tipo)}66;
  box-shadow: 0 0 15px ${props => getColorTipo(props.tipo)}33;
  letter-spacing: 1px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${tema.espaciado.lg};
  gap: ${tema.espaciado.xl};
`;

const SeccionEstadisticas = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: ${tema.espaciado.xl};
  border-radius: ${tema.bordes.radio};
  backdrop-filter: blur(10px);
`;

const TituloSeccion = styled.h3`
  font-family: ${tema.fuentes.secundaria};
  color: ${tema.colores.texto};
  margin-bottom: ${tema.espaciado.lg};
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px ${props => getColorTipo(props.tipo)}66;
`;

const Lista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${tema.espaciado.md};
`;

const Item = styled.li`
  color: ${tema.colores.texto};
  display: flex;
  align-items: center;
  gap: ${tema.espaciado.md};
  font-size: 1rem;
  text-transform: capitalize;
`;

const BarraEstadistica = styled.div`
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${tema.bordes.radioPequeno};
  overflow: hidden;
  flex-grow: 1;
  position: relative;

  div {
    height: 100%;
    background: linear-gradient(
      90deg,
      ${props => getColorTipo(props.tipo)}66,
      ${props => getColorTipo(props.tipo)}cc
    );
    width: 0;
    transition: width 1.5s ease-out;
    box-shadow: 0 0 10px ${props => getColorTipo(props.tipo)}66;
  }
`;

const ValorEstadistica = styled.span`
  min-width: 35px;
  text-align: right;
  font-family: ${tema.fuentes.secundaria};
  font-size: 1rem;
  color: ${tema.colores.texto};
  opacity: 0;
  transform: translateX(-10px);
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: ${props => props.delay}s;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ModalPokemon = ({ pokemon, onClose }) => {
  const tipoPrincipal = pokemon?.types?.[0]?.type?.name || 'normal';
  const [animatedStats, setAnimatedStats] = React.useState({});

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const stats = {};
      pokemon.stats.forEach(stat => {
        stats[stat.stat.name] = stat.base_stat;
      });
      setAnimatedStats(stats);
    }, 100);

    return () => clearTimeout(timer);
  }, [pokemon]);

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContainer
          tipo={tipoPrincipal}
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <LeftSection tipo={tipoPrincipal}>
            <ImagenContainer tipo={tipoPrincipal}>
              <ImagenPokemon
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            </ImagenContainer>
            <NombrePokemon tipo={tipoPrincipal}>{pokemon.name}</NombrePokemon>
            <TiposContainer>
              {pokemon.types.map((type, index) => (
                <TipoChip key={index} tipo={type.type.name}>
                  {type.type.name}
                </TipoChip>
              ))}
            </TiposContainer>
          </LeftSection>

          <RightSection>
            <SeccionEstadisticas>
              <TituloSeccion tipo={tipoPrincipal}>Estadísticas</TituloSeccion>
              <Lista>
                {pokemon.stats.map((stat, index) => (
                  <Item key={index}>
                    {formatStatName(stat.stat.name)}
                    <BarraEstadistica tipo={tipoPrincipal}>
                      <div style={{ 
                        width: `${(animatedStats[stat.stat.name] / getMaxStatValue(stat.stat.name)) * 100}%` 
                      }} />
                    </BarraEstadistica>
                    <ValorEstadistica delay={0.5 + index * 0.1}>
                      {animatedStats[stat.stat.name] || 0}
                    </ValorEstadistica>
                  </Item>
                ))}
              </Lista>
            </SeccionEstadisticas>
          </RightSection>
        </ModalContainer>
      </Overlay>
    </AnimatePresence>
  );
};

export default ModalPokemon; 