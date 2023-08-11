import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import './styles/SelectTypes.css'


const SelectTypes = ({setseletValue, setInputValue, seletValue}) => {
  const url = "https://pokeapi.co/api/v2/type";

  const [types, getAllTypes] = useFetch(url);

  useEffect(() => {
    getAllTypes();
  }, []);

  const handleChange = e =>{
    setseletValue(e.target.value)
    setInputValue('')
  }


  return (
    <div className="selectypes__container">
      <select className="selectypes__select" value={seletValue} onChange={handleChange}>
        <option className="selectypes__option--default" value="allpokemons">Todos los pokemones</option>
        {types?.results.map(type => (
          <option className="selectypes__options" key={type.url} value={type.url}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
);

};

export default SelectTypes;
