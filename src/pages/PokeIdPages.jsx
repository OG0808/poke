import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

const PokeIdPages = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  const [pokemon, getPokemon] = useFetch(url);

  const firstType = pokemon?.types[0].type.name;

  console.log(pokemon);

  useEffect(() => {
    getPokemon();
  }, [id]);

  return (
    <div className="pokeid__main__container">
      <header className="pokeid__header">
        <img
          className="pokeid__header__image"
          src="./public/images/headerid.svg"
          alt=""
        />
        <img
          className="pokeid__header__image2"
          src="./public/images/pokedexball.svg"
          alt=""
        />
      </header>

      <article className="pokeid__container">
        <section className={`pokeid__colorbar ${firstType}-gradient`}>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </section>

        <h2 className="pokeid__posicion">#{pokemon?.order}</h2>

        <section className="pokeid__name">
          <div className="pokeid__name__line" />
          <h2>{pokemon?.name}</h2>
          <div className="pokeid__name__line" />
        </section>

        <section className="pokeid__first__stats">
          <div>
            <p>Peso</p>
            <h2>{pokemon?.weight}</h2>
          </div>

          <div>
            <p>Altura</p>
            <h2>{pokemon?.height}</h2>
          </div>
        </section>

        <section className="pokeid__habilities__types">
          <div className="pokeid__tipos">
            <h2>Tipo</h2>
            <div>
              {pokemon?.types.map((type) => (
                <p
                  className={` pokeid__list__tipo ${firstType}-color-pokeid`}
                  key={type.type.name}
                >
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>

          <div className="pokeid__habilidades">
            <h2>Habilidades</h2>
            <div>
              {pokemon?.abilities.map((abiliti) => (
                <p
                  className="pokeid__list__habilidades"
                  key={abiliti.ability.name}
                >
                  {abiliti.ability.name}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="pokeid__stats">
          <div className="pokeid__stats-title">
            <h2>Estadísticas</h2>
            <div></div>
            <img src="./public/images/ball.svg" alt="" />
          </div>

          {pokemon?.stats.map((stats) => {
            const fillPercentage = (stats.base_stat / 150) * 100;

            return (
              <div key={stats.stat.name} className="pokeid__stats-item">
                <div className="pokeid__stats-info">
                  <p className="pokeid__stats-info-text">{stats.stat.name}</p>
                  <p>{stats.base_stat}/150</p>
                </div>
                <div className="pokeid__barrademedida">
                  <div
                    className="progress-fill"
                    style={{ width: `${fillPercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </section>
      </article>

      <article className="pokeid__article_moves">
        <div className="pokeid__move__title">
          <h2>Movimientos</h2>
          <div></div>
          <img src="./public/images/ball.svg" alt="" />
        </div>
        <div className=" pokeid__moves">
          {pokemon?.moves.map((move) => (
            <p>{move.move.name}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default PokeIdPages;
