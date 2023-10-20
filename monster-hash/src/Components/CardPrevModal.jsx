import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./Card.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {
  BookmarkBorderSharp, 
  BookmarkAddOutlined,
  StarBorder,
  StarRate,
} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { removeCard, addToFavorites } from "../redux/cardsState";
import { useLocation } from "react-router-dom";
import { AddToFavs } from "./CustomFuntions";

// style for the modal button
const modelBtn = {
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: 3,
  left: 0,
  top: 0,
};

// modal container styles
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  backgroundColor: "red",
};

// Main component
export default function CardPrevModal({ cardInfo }) {
  const [open, setOpen] = useState(false);
  const [modDesc, setModDesc] = useState("");

  // get deck array from redux
  const deck = useSelector((state) => state.cardsState.deck);

  // Dispatch is used to call the actions and update the store
  const dispatch = useDispatch();

  const location = useLocation();
  /* 
    "pathname": "/deck",
    "search": "",
    "hash": "",
    "state": null,
    "key": "3t6f9jub"
  */

  // open the modal
  const handleOpen = () => {
    setOpen(true);
    console.log(cardInfo);
  };

  // close the modal
  const onCloseModal = () => {
    setOpen(false);
  };

  // Add card to favorites array in stroe
  function addToFav(card) {
    // dave card to redux deck array
  
    const currentUserId = "6531a8c18b7c13f3ec6ec752"

    // add to use doc on mongo
    AddToFavs(currentUserId, card);

    // add to redux store
    dispatch(addToFavorites(card));
    
  }

  function removeFromDeck(card) {
    // dave card to redux deck array
    dispatch(removeCard(card));

    console.log("card: ", card);
  }

  return (
    <>
      <div className="model-btn" style={modelBtn} onClick={handleOpen}></div>
      <div style={styles}>
        <Modal
          open={open}
          onClose={() => onCloseModal()}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
          }}
        >
          <h2>{cardInfo.name}</h2>

          <LazyLoadImage
            id={`image-${cardInfo._id}`}
            alt={cardInfo.name}
            effect="blur"
            style={{
              borderRadius: `3px`,
              borderRadius: `3px`,
              maxHeight: `642px`,
              minHeight: `320px`,
              minWidth: `320px`,
              maxWidth: `642px`,
              width: `100%`,
            }}
            visibleByDefault={false}
            src={cardInfo.card_images[0].image_url} // use normal <img> attributes as props
          />
          <p className="card_desc">{cardInfo.desc}</p>

          <div className="save_button_sections">
            {cardInfo.banlist_info?.ban_tcg === "Banned" ? (
              <p className="banned_warning">Banned</p>
            ) : (
              <></>
            )}
            {location.pathname !== "/deck" ? (
              <>
                <IconButton color="success" aria-label="add to deck">
                  <StarBorder
                    titleAccess="Add to favorites"
                    onClick={() => addToFav(cardInfo)}
                  />
                </IconButton>
                {/* <IconButton color="success" aria-label="add to deck">
                  <BookmarkBorderSharp titleAccess="Add to favorites" />
                </IconButton> */}
              </>
            ) : (
              <IconButton
                color="error"
                aria-label="add to deck"
                onClick={() => removeFromDeck(cardInfo)}
              >
                <BookmarkAddOutlined titleAccess="remove from deck" />
              </IconButton>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}
