import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

const pokeapi = {
  // Obtener lista de Pokémon con paginación
  getPokemonList: async (offset = 0, limit = 20) => {
    try {
      const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la lista de Pokémon:', error);
      throw error;
    }
  },

  // Obtener detalles de un Pokémon por nombre o ID
  getPokemonDetails: async (identifier) => {
    try {
      const response = await axios.get(`${API_URL}/pokemon/${identifier.toLowerCase()}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener detalles del Pokémon:', error);
      throw error;
    }
  },

  // Obtener lista de tipos
  getTypes: async () => {
    try {
      const response = await axios.get(`${API_URL}/type`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la lista de tipos:', error);
      throw error;
    }
  },

  // Obtener todos los Pokémon de un tipo específico
  getPokemonByType: async (type) => {
    try {
      const response = await axios.get(`${API_URL}/type/${type}`);
      // La API devuelve los Pokémon en response.data.pokemon
      const pokemonList = response.data.pokemon;
      
      // Extraer los detalles de cada Pokémon
      const detailedPokemon = await Promise.all(
        pokemonList.map(p => axios.get(p.pokemon.url).then(res => res.data))
      );
      
      return {
        results: detailedPokemon,
        count: detailedPokemon.length
      };
    } catch (error) {
      console.error('Error al obtener Pokémon por tipo:', error);
      throw error;
    }
  },

  // Buscar Pokémon por nombre (búsqueda en tiempo real)
  searchPokemon: async (query, limit = 20) => {
    try {
      // Primero obtenemos una lista grande de Pokémon para buscar
      const response = await axios.get(`${API_URL}/pokemon?limit=1000`);
      const allPokemon = response.data.results;
      
      // Filtramos los que coinciden con la búsqueda
      const filteredPokemon = allPokemon.filter(pokemon => 
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      // Obtenemos los detalles de los Pokémon filtrados
      const pokemonDetails = await Promise.all(
        filteredPokemon.slice(0, limit).map(pokemon => 
          axios.get(pokemon.url).then(res => res.data)
        )
      );

      return {
        results: pokemonDetails,
        count: filteredPokemon.length
      };
    } catch (error) {
      console.error('Error al buscar Pokémon:', error);
      throw error;
    }
  },

  // Obtener lista paginada de Pokémon con detalles
  getPaginatedPokemonWithDetails: async (offset = 0, limit = 20) => {
    try {
      const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
      const pokemonList = response.data.results;
      
      const pokemonDetails = await Promise.all(
        pokemonList.map(pokemon => 
          axios.get(pokemon.url).then(res => res.data)
        )
      );

      return {
        results: pokemonDetails,
        count: response.data.count
      };
    } catch (error) {
      console.error('Error al obtener lista paginada de Pokémon:', error);
      throw error;
    }
  },

  // Obtener detalles de un tipo específico
  getTypeDetails: async (typeId) => {
    try {
      const response = await axios.get(`${API_URL}/type/${typeId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener detalles del tipo:', error);
      throw error;
    }
  },

  // Obtener cadena evolutiva
  getEvolutionChain: async (pokemonId) => {
    try {
      const speciesResponse = await axios.get(`${API_URL}/pokemon-species/${pokemonId}`);
      const evolutionChainResponse = await axios.get(speciesResponse.data.evolution_chain.url);
      return evolutionChainResponse.data;
    } catch (error) {
      console.error('Error al obtener la cadena evolutiva:', error);
      throw error;
    }
  }
};

export default pokeapi; 