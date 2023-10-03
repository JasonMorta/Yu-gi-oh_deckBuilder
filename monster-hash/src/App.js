import logo from './logo.svg';
import './App.css';
import InitCards from './Components/InitCards';
import Search from './Components/Search';
import CardList from './Components/CardList';
import CardPrevModal from './Components/CardPrevModal';

function App() {
  return (
    <div className="App">
      <InitCards />
     
        <Search />
      <CardList />
    </div>
  );
}

export default App;
