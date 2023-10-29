import { createSlice } from '@reduxjs/toolkit'
// import _, { set } from "lodash";
import { RemoveFromFavs } from '../Components/CustomFuntions';

//set all state initial values
const initialState = {
    allCards: [],//all cards from API
    input: '',//search input
    filteredCards: [],// search results
    filterList: [],// Filter keys
    initialFilterList: [],// Add all filtered cards here
    isFiltering: false,
    searchResults: [],// search results
    deck: [],//current - selected deck
    savedDecks: [],//deck names from API - {deckName: 'name', cardIds: [] }
    favoriteCards: [],//favorite cards from API
    edit: false,
    currentEdit: null,
    showMyDeck: false,
    userToken: null,
    toggleButtons: {
        spell: false,
        trap: false,
        monster: false,
    },
    userData: {},

}


export const state = createSlice({
    name: 'CardHASH',//name is required
    initialState,

    //All state values/functions are written/handled here
    reducers: {
        loadCards: (state, action) => {
            state.allCards = action.payload
            console.log(`%c All cards loaded`, 'color: green')
        },

        //When making a search in the search bar
        filter: (state, action) => {
            // First disable filter when making a new search
            state.isFiltering = false
            state.searchResults = action.payload[1]
            console.log('action.payload', action.payload)

        },
        filerMyResults: (state, action) => {//when selecting filters
            console.log('ACTION', action.payload)

            let filterKeys = [action.payload.add]

            //First Toggle the toggleButtons state boolean values
            state.toggleButtons[action.payload.add] = !state.toggleButtons[action.payload.add];

            // remove the del value from the filterList or add the add value to the filterList
            //.del will always be 'undefined' when adding a filter, 
            //else .del will contain the name of the removed filter.

            //!Handle filter keywords
            if (action.payload.del !== undefined) {//when selecting the 'x' icon
                // Remove the deleted option from the filterList
                state.filterList = state.filterList.filter(item => item !== action.payload.del)
            } else {
                // Spread the filterKey a nd join them to the filterList
                state.filterList = [...state.filterList, ...filterKeys.filter(item => item.trim() !== '')]
           
            }
            console.log('FilterList', state.filterList)

            const filterLength = state.filterList//filet keywords
            console.log('filterLength.length', filterLength.length)
            //This will be used to only display the filters type results
            filterLength.length > 0 ? state.isFiltering = true : state.isFiltering = false
          

            //filler all the cards bases on the filterList values
            //! Handle all filtered cards


            // If filterLength is 0, the no filter is selected
            // The first filter that is selected will set/fill the initialFilterList and
            // the filteredCards with be the searchResults
            if (filterLength.length > 0) {
                state.filteredCards = state.searchResults.filter(card => {
                  

                    // Create a regular expression from the filterList array and test it against the card.type
                    // 
                    const regex = new RegExp("\\b" + state.filterList.join("|") + "\\b", "i");
                   
                        return regex.test(card.type) || regex.test(card.race);
                   

// type: "Tuner Monster"
// type: "Spell Card"
// type: "Effect Monster"
// type: "Trap Card"
// type: "Synchro Monster"
// type: "Normal Monster"
// type: "Ritual Monster"
// type: "Fusion Monster"
// type: "XYZ Monster"
// type: "Flip Effect Monster"
// type: "Link Monster"
// type: "Pendulum Effect Monster"
// type: "Pendulum Normal Monster"
// type: "Pendulum Tuner Effect Monster"
// type: "Pendulum Flip Effect Monster"
// type: "Pendulum Effect Fusion Monster"
// type: "Pendulum Effect Synchro Monster"
// type: "Pendulum Effect Xyz Monster"
// type: "Pendulum Effect Link Monster"
// type: "Skill Card"
// type: "Token"
                    /* 
                    This regular expression is designed to match any of the words in the filterList 
                    array as complete words in a case-insensitive manner. 
                    This allows you to effectively check if any of the elements 
                    in the list match the target string or not.
                    */
                    

                });
               
            } 


        },
        saveDeck: (state, action) => {
            // Save deck to state
            // state.deck = [...state.deck, action.payload]
        },
        deleteCard: (state, action) => {
            // Delete card from deck
            state.deck = state.deck.filter(item => item.id !== action.payload)
        },
        showDeck: (state, action) => {
            // Toggle showDeck state
            state.showMyDeck = !state.showMyDeck
        },
        removeCard: (state, action) => {// Remove card from favs
            console.log('action', action)
            console.log('action', action)
            // Remove card from deck
            state.favoriteCards = state.favoriteCards.filter(item => item.id !== action.payload.id)
           
          
        },
        setFavoriteCards: (state, action) => { //on app load
            // Set favorite cards
            state.favoriteCards = action.payload[1].favoriteCards

            //set user data
            state.userData = action.payload[1]
        },
        addToFavorites: (state, action) => {

            // Add to favorites
            state.favoriteCards = [...state.favoriteCards, action.payload]
        },
        toggleButts: (state, action) => {

            //toggle button boolean values individually
            state.toggleButtons[action.payload] = !state.toggleButtons[action.payload];

        },





    },
})

// Action creators are generated for each case reducer function
export const {
    loadCards,
    filter,
    saveDeck,
    showDeck,
    removeCard,
    filerMyResults,
    setFavoriteCards,
    addToFavorites,
    toggleButts
} = state.actions

export default state.reducer