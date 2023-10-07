import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { loadCards } from "../redux/cardsState";

export default function DeckEdit() {

    //get deck array from redux
    //const deck = useSelector((state) => state.cards.deck);

  return (
    <>
    <h1>Deck</h1>
    {/* Deck layout */}
    <div className="deck">
        {/* {deck.map((card) => (
            <div className="card" key={card.id}>
            <img src={card.card_images[0].image_url} alt="" />
            <p>{card.name}</p>
            </div>
        ))} */}
    </div>
    </>
  )
}
