import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TarjetaPokemon from '../componentes/TarjetaPokemon';
import ModalPokemon from '../componentes/ModalPokemon';
import BarraBusqueda from '../componentes/BarraBusqueda';
import BarraFiltros from '../componentes/BarraFiltros';
import Paginado from '../componentes/Paginado';
import Cargando from '../componentes/Cargando';
import pokeapi from '../servicios/pokeapi';

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #13151a;
`;

const ContentContainer = styled.main`
  width: 100%;
  max-width: 1800px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 20px rgba(111, 53, 252, 0.5);
`;

const Controls = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const GridWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const PokemonGrid = styled(motion.div)`
  width: 100%;
  max-width: 1600px;
  display: grid;
  gap: 2rem;
  padding: 0 1rem;
  justify-content: center;
  
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(250px, 1fr));
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(250px, 1fr));
  }
  
  @media (min-width: 1600px) {
    grid-template-columns: repeat(6, minmax(250px, 1fr));
  }
`;

// Mensaje cuando no hay resultados
const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
`;


const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(32);
  const [totalPokemon, setTotalPokemon] = useState(0);

  const POKEMON_PER_PAGE = 20;

  const [containerWidth, setContainerWidth] = React.useState(0);
  const gridRef = React.useRef(null);

  React.useEffect(() => {
    const updateWidth = () => {
      if (gridRef.current) {
        const containerWidth = gridRef.current.offsetWidth;
        setContainerWidth(containerWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const fetchTypes = useCallback(async () => {
    try {
      const typesData = await pokeapi.getTypes();
      setTypes(typesData.results);
    } catch (error) {
      console.error('Error al obtener tipos:', error);
    }
  }, []);

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    try {
      let pokemonData;
      // si hay un termino buscar el pokemon en la api
      if (searchTerm.length >= 2) {
        pokemonData = await pokeapi.searchPokemon(searchTerm, itemsPerPage);
      }
      // Si se selecciona por el tipo obtener todos los pokemones de ese tipo
      else if (selectedType) {
        pokemonData = await pokeapi.getPokemonByType(selectedType);
      }
      // Si no se filtra nada se obtiene la lista paginada normal
      else {
        const offset = (currentPage - 1) * itemsPerPage;
        pokemonData = await pokeapi.getPaginatedPokemonWithDetails(offset, itemsPerPage);
      }

      let sortedPokemon = [...pokemonData.results];
      
      // ordenar los pokemones por nombre
      sortedPokemon.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

      setPokemonList(sortedPokemon);
      setTotalPokemon(pokemonData.count);
      setTotalPages(Math.ceil(pokemonData.count / itemsPerPage));
    } catch (error) {
      console.error('Error al obtener Pokémon:', error);
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedType, sortOrder, searchTerm, itemsPerPage]);

  // efecto para cargar los tipos de pokemones
  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setCurrentPage(1); 
      fetchPokemon();
    }, searchTerm.length >= 2 ? 300 : 0); 

    return () => clearTimeout(debounceTimer);
  }, [fetchPokemon, searchTerm]);

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 2) {
      fetchPokemon();
    }
  }, [currentPage, itemsPerPage, selectedType, sortOrder]);

  const handlePokemonClick = useCallback((pokemon) => {
    console.log('Pokemon clicked:', pokemon);
    setSelectedPokemon(pokemon);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setSelectedType(''); // Limpiar el filtro de tipo al buscar
  }, []);

  const handleFilterChange = useCallback((type, value) => {
    if (type === 'tipo') {
      setSelectedType(value);
      setSearchTerm(''); // limpiar la busqueda
      setCurrentPage(1);
    }
  }, []);

  const handleSortChange = useCallback((order) => {
    setSortOrder(order);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); 
  }, []);

  return (
    <ContentContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pokédex
      </Title>

      <Controls>
        <BarraBusqueda onSearch={handleSearch} />
        <BarraFiltros
          tipos={types}
          onFilterChange={handleFilterChange}
          onSortChange={setSortOrder}
          sortOrder={sortOrder}
          selectedType={selectedType}
        />
      </Controls>

      {loading ? (
        <Cargando />
      ) : pokemonList.length > 0 ? (
        <>
          <PokemonGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {pokemonList.map((pokemon) => (
                <TarjetaPokemon
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={() => setSelectedPokemon(pokemon)}
                />
              ))}
            </AnimatePresence>
          </PokemonGrid>

          {!searchTerm && !selectedType && (
            <PaginationWrapper>
              <Paginado
                paginaActual={currentPage}
                totalPaginas={totalPages}
                onPageChange={setCurrentPage}
                itemsPorPagina={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </PaginationWrapper>
          )}
        </>
      ) : (
        <EmptyMessage>
          No se encontraron Pokémon que coincidan con tu búsqueda
        </EmptyMessage>
      )}

      <AnimatePresence>
        {selectedPokemon && (
          <ModalPokemon
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </AnimatePresence>
    </ContentContainer>
  );
};

export default React.memo(Pokedex);
