import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { tema } from '../estilos/tema';

const SearchContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${tema.espaciado.md} ${tema.espaciado.xl};
  padding-right: ${props => props.value ? '2.5rem' : tema.espaciado.xl};
  background: rgba(10, 10, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${tema.bordes.radio};
  color: ${tema.colores.texto};
  font-size: 1rem;
  transition: all ${tema.animaciones.rapida};
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: ${tema.colores.primario};
    box-shadow: ${tema.sombras.neon};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: ${tema.espaciado.md};
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  transition: color ${tema.animaciones.rapida};

  ${SearchInput}:focus + & {
    color: ${tema.colores.primario};
  }
`;

const ClearButton = styled(motion.button)`
  position: absolute;
  right: ${tema.espaciado.sm};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: ${tema.espaciado.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${tema.animaciones.rapida};

  &:hover {
    color: ${tema.colores.texto};
  }

  &:focus {
    outline: none;
    color: ${tema.colores.primario};
  }
`;

const BarraBusqueda = ({ onSearch }) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <SearchContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SearchInput
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchValue}
        onChange={handleChange}
        autoComplete="off"
      />
      <SearchIcon />
      {searchValue && (
        <ClearButton
          onClick={handleClear}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTimes />
        </ClearButton>
      )}
    </SearchContainer>
  );
};

export default BarraBusqueda; 