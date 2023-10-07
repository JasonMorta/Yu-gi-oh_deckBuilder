import logo from './logo.svg';
import './App.css';
import InitCards from './Components/InitCards';
import Search from './Components/Search';
import CardList from './Components/CardList';
import BasicButtons from './Components/Btn';
import { useState } from 'react';
import DeckEdit from './Components/DeckEdit';
import { useSelector, useDispatch } from "react-redux";
import { showDeck } from "./redux/cardsState";

function App() {

  const dispatch = useDispatch()

  //get showDeck boolean from state
  const ED = useSelector((state) => state.cardsState.showMyDeck)

  return (
    <div className="App">
      <InitCards />
        <BasicButtons 
        onClick={()=> dispatch(showDeck(!showDeck))}
        text={!ED ? "Show My Deck" : "Back to Search"}
        variant={"contained"} />
        {!ED  ? 
      <>
        <Search />
        <CardList />
      </>
      :
      <DeckEdit />}
    </div>
  );
}

export default App;
