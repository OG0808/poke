import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokemonsCard from "../components/pokedexPages/PokemonsCard";
import SelectTypes from "../components/pokedexPages/SelectTypes";

const PokedexPages = () => {
  const [seletValue, setseletValue] = useState("allpokemons");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPokemons = 5000;
  const maxPages = Math.ceil(totalPokemons / itemsPerPage);

  const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
  const endPage = Math.min(startPage + 9, maxPages);

  const trainer = useSelector((reducer) => reducer.trainer);

  const offset = (currentPage - 1) * itemsPerPage;
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`;

  const [pokemons, getAllPokemos, getPokemonsByType] = useFetch(url);

  useEffect(() => {
    if (seletValue === "allpokemons") {
      getAllPokemos();
    } else {
      getPokemonsByType(seletValue);
    }
  }, [seletValue, currentPage]);

  const inputSearch = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase());
    setseletValue("allpokemons");
  };

  const cbFilter = (poke) => poke.name.includes(inputValue);

  return (
    <div className="pokedexpages__container">
      <header className="pokedexpages__container__header">
        <img className="pokeid__header__image" src="/images/header.svg" alt="" />
        <img className="pokeid__header__image2" src="/images/pokedexball.svg" alt="" />
      </header>
      <p className="pokedexpages__bienvenido">
        <span>Bienvenido {trainer}</span>, aquí podrás encontrar tu Pokémon
        favorito
      </p>
      <div className="pokedexpages__container__formularios">
        <form className="pokedexpages__formulario" onSubmit={handleClick}>
          <input
            placeholder="Buscar un pokemon"
            ref={inputSearch}
            type="text"
          />
          <button>Buscar</button>
        </form>
        <SelectTypes
          seletValue={seletValue}
          setInputValue={setInputValue}
          setseletValue={setseletValue}
        />
      </div>
      <div className="pokedexPages__container__cards">
        {pokemons?.results.filter(cbFilter).map((poke) => (
          <PokemonsCard key={poke.url} url={poke.url} />
        ))}
      </div>
      <div className="pagination">
        <button className="pokedexpages__prev" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
        <i  className= ' pokedexpages__icon__prev bx bx-chevrons-up bx-lg'></i>
        </button>

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((page) => (
          <button 
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "pokedexpages__buttons__options__active" : "pokedexpages__buttons__options"}
            
          >
            {page}
          </button>
        ))}

        <button className="pokedexpages__next"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, maxPages))}
        >
          <i className='pokedexpages__icon__next  bx bx-chevrons-up bx-lg'></i>
        </button>
      </div>
    </div>
  );
};

export default PokedexPages;
