import "./App.css";
import "./styles/HomePage.css"
import './styles/PokeCard.css'
import './styles/PokedexPages.css'
import './styles/PokeIdPages.css'
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokedexPages from "./pages/PokedexPages";
import Pages404 from "./pages/Pages404";
import PokeIdPages from "./pages/PokeIdPages";
import ProtectedRoutes from "./pages/ProtectedRoutes";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} /> 

        <Route element={<ProtectedRoutes/> }>
          <Route path="/pokedex" element={<PokedexPages />} />
          <Route  path="/pokedex/:id" element={<PokeIdPages />} />
        </Route>
        
        <Route path="*" element={<Pages404 />} />
      </Routes>
    </div>
  );
}

export default App;
