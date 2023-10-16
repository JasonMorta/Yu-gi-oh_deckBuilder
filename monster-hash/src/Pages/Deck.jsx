import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LazyImage from "../Components/LazyImage";
import CSS from "../Components/cardList.module.css";

export default function Deck() {
  // Get filtered cards from state
  const cards = useSelector((state) => state.cardsState.deck);
  console.log("cards", cards);

  return (
    <div className={CSS.result_container}>
      {cards?.map((card) => (
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
