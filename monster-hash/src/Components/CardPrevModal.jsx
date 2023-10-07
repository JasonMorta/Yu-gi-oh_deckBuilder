import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./Card.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { loadCards, saveDeck } from "../redux/cardsState";

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

  // open the modal
  const handleOpen = () => {
    description();
    setOpen(true);
  };

  // close the modal
  const onCloseModal = () => {
    setOpen(false);
  };


// modify card description
  function description() {
    let str = cardInfo.desc;
    let modifiedString = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '"') {
        modifiedString += "";
      } else if (str[i] === "\n") {
        modifiedString += "";
      } else if (str[i] === "\r") {
        modifiedString += "";
      } else if (str[i] === `●`) {
        modifiedString += `<li>●`;
      } else {
        modifiedString += str[i];
      }
    }
    setModDesc(<p>{modifiedString}</p>);
    console.log(modDesc);
  }

  // add(not save) card to deck
  function addToDeck(card) {
  // dave card to redux deck array
    dispatch(saveDeck(card));

    console.log('deck: ',deck)

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
          {cardInfo.banlist_info?.ban_tcg === "Banned" ? "Banned" : null}
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
          {modDesc.props?.children}

          <IconButton color="success" aria-label="add to deck">
            <SaveIcon onClick={() => addToDeck(cardInfo)} />
          </IconButton>
        </Modal>
      </div>
    </>
  );
}
