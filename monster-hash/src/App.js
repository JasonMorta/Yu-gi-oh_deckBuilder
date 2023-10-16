import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitCards from './Components/InitCards';
import Search from './Components/Search';
import CardList from './Components/CardList';
import BasicButtons from './Components/Btn';
import { useState } from 'react';
import DeckEdit from './Components/DeckEdit';
import { useSelector, useDispatch } from "react-redux";
import { showDeck } from "./redux/cardsState";
import SearchInput from './Components/SearchInput';
import Home from './Pages/Home';
import Deck from './Pages/Deck';
import Favs from './Pages/Favs';
import About from './Pages/About';
import Navigation from './Components/Navigation';

function App() {


  return (
    <BrowserRouter>
    <div className="App">
      <InitCards />

      <Navigation />
      

      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="deck" element={<Deck />} />
        <Route path="favs" element={<Favs />} />
        <Route path="about" element={<About />} />
      </Routes>


    </div>
    </BrowserRouter>
  );
}

export default App;
