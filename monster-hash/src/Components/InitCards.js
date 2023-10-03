import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadCards  } from "../redux/cardsState";


// The component will fect all the cards form the serve on load.
//Cars will be stored in the redux store.
export default function InitCards() {

    // Dispatch is used to call the actions and update the store
    const dispatch = useDispatch(); 


    // API Call
    async function fetchCards() {
     
        await fetch("/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((response) => {
            // save cards to redux store
            dispatch(loadCards(response))
         
        })
        .catch((error) => {
   
          console.table(error)
        })
      }

    useEffect(() => {
        fetchCards()
    }, [])


  

  return
}
