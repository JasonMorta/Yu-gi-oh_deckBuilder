import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import CSS from "./toggleBtn.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleButts } from "../redux/cardsState";

export default function ToggleBtn({ color, text, clickEvent, buttonId }) {
  // get dispatch
  const dispatch = useDispatch();

  //get buttons state from redux
  const toggleButtons = useSelector((state) => state.cardsState.toggleButtons);

  return (
    <Button
      key={buttonId}
      toggle
      active={toggleButtons[buttonId]}
      onClick={clickEvent}
      onMouseDown={() => dispatch(toggleButts(buttonId))}
    >
      {text}
    </Button>
  );
}
