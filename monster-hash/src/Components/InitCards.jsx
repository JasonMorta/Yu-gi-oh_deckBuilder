import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadCards, setFavoriteCards } from "../redux/cardsState";
import { GetUserData } from './CustomFuntions';


// The component will fect all the cards form the serve on load.
//Cars will be stored in the redux store.
export default function InitCards() {

  // Dispatch is used to call the actions and update the store
  const dispatch = useDispatch();


  //gets user data and send to store
  useEffect(() => {
   async function fetchData() {
    dispatch(setFavoriteCards( await GetUserData("6531a8c18b7c13f3ec6ec752")))
   }
   fetchData() 
  }, [])
}
