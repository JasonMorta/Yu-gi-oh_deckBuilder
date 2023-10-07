import logo from './logo.svg';
import './App.css';
import InitCards from './Components/InitCards';
import Search from './Components/Search';
import CardList from './Components/CardList';
import CardPrevModal from './Components/CardPrevModal';
import BasicButtons from './Components/Btn';
import { useState } from 'react';
import DeckEdit from './Components/DeckEdit';

function App() {

  const [showDeck, setShowDeck] = useState(false)


  function deck() {
    setShowDeck(!showDeck)
  }

  return (
    <div className="App">
      <InitCards />
        <BasicButtons 
        onClick={()=> deck()}
        text={"Deck"}
        variant={"contained"} />
        {showDeck  ? 
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
