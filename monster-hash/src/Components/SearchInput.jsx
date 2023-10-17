import React, { useState } from 'react'
import { Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";
import { filter,  } from "../redux/cardsState";
import CSS from "./searchInput.module.css"


export default function SearchInput() {

    const [input, setInput] = useState('')

    //get dispatch from store
    const dispatch = useDispatch();

  
 


    
 function searchIcon(e) {
      dispatch(filter(input));
  }

  function handleInput(e) {
  //disable filtering when making new search request
      setInput(e.target.value)

      //make a search request on"Enter" key
        if (e.key === "Enter") {
            dispatch(filter(e.target.value));
        }
  }


  return (
    <Input
    icon={{ name: 'search', circular: true, link: true, onClick: searchIcon, }}
    placeholder='Search...'
    onKeyDown={(e)=> handleInput(e)}
    className={CSS.searchInput}
  />
  )
}


