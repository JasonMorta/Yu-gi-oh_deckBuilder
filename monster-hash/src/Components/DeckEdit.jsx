import React from 'react'
import "./DeckEdit.css"
import { useSelector, useDispatch } from "react-redux";
import { loadCards } from "../redux/cardsState";
import LazyImage from './LazyImage';

export default function DeckEdit() {

    //get deck array from redux
    const deck = useSelector((state) => state.cardsState.deck);
    console.log('deck', deck)

  return (
    <>

    {/* Deck layout */}
    <div className="deck">
    <h1>Deck</h1>
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
