import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrainerG } from "../store/slices/trainer.slice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const inputTrainer = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const habdleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerG(inputTrainer.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <div className="homePage__pokedex">
      <img src="/images/logoPokedex.svg" alt="" />
      <div className="homePage__welcome">
      <h2>¡Hola entrenador!</h2>
      <p>Para poder comenzar, dame tu nombre</p>
      </div>
      <form className="homePage__form" onSubmit={habdleSubmit}>
        <input placeholder="Tu nombre" ref={inputTrainer} type="text" />
        <button>Comenzar</button>
      </form>
      <img className="homePage__footer" src="/images/footerHomePage.svg" alt="" />
    </div>
  );
};
5;

export default HomePage;
