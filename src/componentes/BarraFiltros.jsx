import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { tema } from '../estilos/tema';
import { FaFilter, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

const FiltrosContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: ${tema.espaciado.md};
  justify-content: flex-end;
  align-items: center;
  padding: ${tema.espaciado.md} ${tema.espaciado.xl};
  background: rgba(10, 10, 26, 0.8);
  border-radius: ${tema.bordes.radio};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  height: 100%;

  @media (max-width: ${tema.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const FiltroGrupo = styled.div`
  display: flex;
  align-items: center;
  gap: ${tema.espaciado.md};
  position: relative;

  &:not(:last-child) {
    padding-right: ${tema.espaciado.lg};
    margin-right: ${tema.espaciado.md};
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Select = styled.select`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${tema.bordes.radioPequeno};
  color: ${tema.colores.texto};
  padding: ${tema.espaciado.sm} ${tema.espaciado.xl};
  font-family: ${tema.fuentes.principal};
  cursor: pointer;
  transition: all ${tema.animaciones.rapida};
  min-width: 120px;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.5) 50%),
                    linear-gradient(135deg, rgba(255, 255, 255, 0.5) 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
                      calc(100% - 15px) calc(1em + 2px);
  background-size: 5px 5px,
                  5px 5px;
  background-repeat: no-repeat;

  &:hover {
    border-color: ${tema.colores.primario}66;
    box-shadow: 0 0 15px ${tema.colores.primario}33;
  }

  &:focus {
    outline: none;
    border-color: ${tema.colores.primario};
    box-shadow: ${tema.sombras.neon};
  }

  option {
    background: ${tema.colores.fondo};
    padding: ${tema.espaciado.sm};
  }
`;

const BotonOrdenar = styled(motion.button)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${tema.bordes.radioPequeno};
  color: ${tema.colores.texto};
  padding: ${tema.espaciado.sm} ${tema.espaciado.xl};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${tema.espaciado.sm};
  transition: all ${tema.animaciones.rapida};
  font-family: ${tema.fuentes.principal};

  &:hover {
    border-color: ${tema.colores.primario}66;
    box-shadow: 0 0 15px ${tema.colores.primario}33;
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 1.1em;
    color: ${tema.colores.primario}cc;
  }
`;

const Etiqueta = styled.span`
  color: ${tema.colores.texto};
  opacity: 0.9;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${tema.espaciado.xs};
  white-space: nowrap;
  
  svg {
    color: ${tema.colores.primario}cc;
  }
`;

const BarraFiltros = ({ tipos, onFilterChange, onSortChange, sortOrder }) => {
  return (
    <FiltrosContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
    >
      <FiltroGrupo>
        <Etiqueta>
          <FaFilter /> Tipo:
        </Etiqueta>
        <Select 
          onChange={(e) => onFilterChange('tipo', e.target.value)}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <option value="">Todos</option>
          {tipos.map((tipo) => (
            <option key={tipo.name} value={tipo.name}>
              {tipo.name.charAt(0).toUpperCase() + tipo.name.slice(1)}
            </option>
          ))}
        </Select>
      </FiltroGrupo>

      <FiltroGrupo>
        <Etiqueta>Ordenar:</Etiqueta>
        <BotonOrdenar
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </BotonOrdenar>
      </FiltroGrupo>
    </FiltrosContainer>
  );
};

export default BarraFiltros; 