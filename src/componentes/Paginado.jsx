import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { tema } from '../estilos/tema';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PaginadoContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${tema.espaciado.sm};
  padding: ${tema.espaciado.md};
  margin-top: ${tema.espaciado.xl};
`;

const BotonPaginado = styled(motion.button)`
  background: rgba(10, 10, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${tema.bordes.radioPequeno};
  color: ${tema.colores.texto};
  padding: ${tema.espaciado.sm} ${tema.espaciado.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${tema.espaciado.xs};
  transition: all ${tema.animaciones.rapida};
  backdrop-filter: blur(5px);

  &:hover {
    border-color: ${tema.colores.primario};
    box-shadow: ${tema.sombras.neon};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: none;
    }
  }
`;

const PaginaActual = styled.span`
  color: ${tema.colores.texto};
  font-family: ${tema.fuentes.secundaria};
  font-size: 1.2rem;
  padding: ${tema.espaciado.sm} ${tema.espaciado.md};
  background: rgba(10, 10, 26, 0.8);
  border-radius: ${tema.bordes.radioPequeno};
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${tema.espaciado.sm};
  margin: 0 ${tema.espaciado.md};
`;

const SelectLabel = styled.label`
  color: ${tema.colores.texto};
  font-family: ${tema.fuentes.secundaria};
  font-size: 1rem;
`;

const Select = styled.select`
  background: rgba(10, 10, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${tema.bordes.radioPequeno};
  color: ${tema.colores.texto};
  padding: ${tema.espaciado.sm} ${tema.espaciado.md};
  font-family: ${tema.fuentes.secundaria};
  font-size: 1rem;
  cursor: pointer;
  transition: all ${tema.animaciones.rapida};
  backdrop-filter: blur(5px);

  &:hover {
    border-color: ${tema.colores.primario};
    box-shadow: ${tema.sombras.neon};
  }

  &:focus {
    outline: none;
    border-color: ${tema.colores.primario};
    box-shadow: ${tema.sombras.neon};
  }

  option {
    background: #13151a;
    color: ${tema.colores.texto};
  }
`;

const Paginado = ({ paginaActual, totalPaginas, onPageChange, itemsPorPagina, onItemsPerPageChange }) => {
  return (
    <PaginadoContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BotonPaginado
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaChevronLeft />
        Anterior
      </BotonPaginado>

      <SelectContainer>
        <SelectLabel>Mostrar:</SelectLabel>
        <Select 
          value={itemsPorPagina} 
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={30}>30</option>
          <option value={60}>60</option>
          <option value={102}>102</option>
        </Select>
      </SelectContainer>

      <PaginaActual>
        Página {paginaActual} de {totalPaginas}
      </PaginaActual>

      <BotonPaginado
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Siguiente
        <FaChevronRight />
      </BotonPaginado>
    </PaginadoContainer>
  );
};

export default Paginado; 