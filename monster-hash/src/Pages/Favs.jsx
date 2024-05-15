import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteCards } from "../redux/cardsState";
import ElDivider from "../Components/ElDivider";
import LazyImage from "../Components/LazyImage";
import { GetUserData } from "../Components/CustomFuntions";
import CSS from "./favCardList.module.css";
import { IconButton } from "@mui/material";
import { RemoveCircleRounded } from "@mui/icons-material";

export default function Favs() {
  // Get filtered cards from state
  const favs = useSelector((state) => state.cardsState.favoriteCards);
  console.log("favs", favs);
  //GetUserData

  return (
    <>
      <ElDivider />
      <ElDivider />

      <div className={CSS.fav_container}>
        {favs?.map((card) => (
          <>
            <LazyImage
              src={card.card_images[0].image_url}
              alt={card.name}
              id={card.id}
              subtitle={card.race}
              title={card.name}
              label={card.name}
              cardInfo={card}
              // Remove from favs btn
              actionIcon={
                <IconButton
                  color="error"
                  aria-label="add to deck"
                  onClick={() => console.log(card)}
                >
                  <RemoveCircleRounded titleAccess="remove from Favs" />
                </IconButton>
              }
            />
          </>
        ))}
      </div>
    </>
  );
}
