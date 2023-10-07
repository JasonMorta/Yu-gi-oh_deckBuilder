import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filter } from "../redux/cardsState";
import TextField from "@mui/material/TextField";

//Filter-out cards by keyword
export default function Search() {

    //get dispatch from store
    const dispatch = useDispatch();

    const [input, setInput] = useState('')
  // Get all cards from state
  const state = useSelector((state) => state.cardsState);
  console.log("Search.js - filtered", state.filteredCards);

  // filter cards by name
  //   const cardName = 'Dragon';

  //   // filter cards by key words from name or card description
  //   const result = jsonData.filter(item => item.name.includes(cardName) || item.desc.includes(cardName))
  //   console.log('result', result)
  //
  //dispatch(loadCards(response))

  async function search(e) {
    const search = e.target.value;

 
    // send search to store on enter key
    if (e.key === "Enter") {
      dispatch(filter(search));
    }
  }
  return (
    <div>
      <TextField 
      id="standard-basic" 
      label="Search" 
      variant="standard" 
      defaultValue={input ? input : ''}
      onKeyDown={(e)=> search(e)}/>
    </div>
  );
}
