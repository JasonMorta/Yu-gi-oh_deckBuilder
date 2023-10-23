import React, { useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { filter } from "../redux/cardsState";
import CSS from "./searchInput.module.css";
import { FindCards } from "./CustomFuntions";

export default function SearchInput() {
  const [input, setInput] = useState("");

  //get dispatch from store
  const dispatch = useDispatch();

  //get cards from API the pass result to store as argument
  async function searchIcon() {
    dispatch(filter(await FindCards(input)));
  }

  async function handleInput(e) {
    //disable filtering when making new search request
    setInput(e.target.value);
    //make a search request on"Enter" key
    if (e.key === "Enter") {
      dispatch(filter(await FindCards(e.target.value)));
    }
  }

  return (
   <>
      <Input
        icon={{ name: "search", circular: true, link: true, onClick: searchIcon }}
        placeholder="Search..."
        //onChange={(e) => handleInput(e)}
        onKeyUp={(e) => handleInput(e)}
        className={CSS.searchInput}
        defaultValue={input}
      />
      <p>{input}</p>
   </>
  );
}
