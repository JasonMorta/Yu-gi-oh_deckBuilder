import React from 'react'
import "./DeckEdit.css"
import { useSelector, useDispatch } from "react-redux";
import { loadCards, saveDeck } from "../redux/cardsState";
import LazyImage from './LazyImage';
import BasicButtons from './Btn';

export default function DeckEdit() {

    //get deck array from redux
    const deck = useSelector((state) => state.cardsState.deck);
    console.log('deck', deck)

  async  function saveDeck() {
    await fetch("/saveDeck", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deck)
    })
      .then((res) => res.json())
      .then((response) => {
        // save cards to redux store
        console.log('saved:')

      })
      .catch((error) => {
        console.table(error)
      })
        
    }

  return (
    <>

    {/* Deck layout */}
    <div className="deck">
    <h1>Deck</h1>
    <BasicButtons 
       onClick={()=> saveDeck()}
       text={"Save Deck"}
       variant={"contained"}
       id={"save-deck-btn"}
     />
    {deck.map((card) => (
       <>
         <LazyImage 
          src={card.card_images[0].image_url}
          alt={card.name}
          id={card.id}
          subtitle={card.race}
          title={card.name}
          label={card.name}
          cardInfo={card}
          />
       </>
           ))}
    </div>
    </>
  )
}
