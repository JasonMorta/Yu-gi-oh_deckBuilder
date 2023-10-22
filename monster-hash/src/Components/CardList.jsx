import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LazyImage from "./LazyImage";
import CSS from "./cardList.module.css";


//display all teh filtered cards
export default function CardList() {

  // Get filtered cards from state
  const filteredCards = useSelector((state) => state.cardsState.filteredCards);
  const searchResults = useSelector((state) => state.cardsState.searchResults);
  const isFiltering = useSelector((state) => state.cardsState.isFiltering);

  return (
    <div className={CSS.result_container} >
      {!isFiltering ? searchResults.map((card) => (
       <div key={card.id}>
         <LazyImage 
          src={card.card_images[0].image_url}
          alt={card.name}
          id={card.id}
          subtitle={card.race}
          title={card.name}
          label={card.name}
          cardInfo={card}
          />
       </div>
           )):
           filteredCards.map((card) => (
            <div key={card.id}>
              <LazyImage 
               src={card.card_images[0].image_url}
               alt={card.name}
               id={card.id}
               subtitle={card.race}
               title={card.name}
               label={card.name}
               cardInfo={card}
               />
            </div>
                ))
           
           }
    </div>
  );
}
