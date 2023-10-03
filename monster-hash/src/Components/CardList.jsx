import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LazyImage from "./LazyImage";
import CardPrevModal from "./CardPrevModal";


//display all teh filtered cards
export default function CardList() {
  const [result, setResult] = useState("");

  // Get filtered cards from state
  const cards = useSelector((state) => state.cardsState.filteredCards);

  return (
    <div className="result-container">
      

      {cards.map((card) => (
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
  );
}
