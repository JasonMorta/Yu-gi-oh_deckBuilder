import { createSlice } from '@reduxjs/toolkit'
import _, { set } from "lodash";

//set all state initial values
const initialState = {
    allCards: [],//all cards from API
    filteredCards: [],// search results
    filterList: [],// array of values to filter by
    isFiltering: false,
    searchResults: [],// search results
    deck: [],//current - selected deck
    savedDecks: [],//deck names from API - {deckName: 'name', cardIds: [] }
    edit: false,
    currentEdit: null,
    showMyDeck: false

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
        filter: (state, action) => {
            console.log('action.payload', action.payload)
            // First disable filter when making a new search
            state.isFiltering = false

            // Filter cards by name or description
            // Also ignore case-sensitivity and search for whole words only
            state.searchResults = state.allCards.filter(item => {
                const regex = new RegExp("\\b" + action.payload.toLowerCase() + "\\b");
                return regex.test(item.name.toLowerCase()) || regex.test(item.desc.toLowerCase());
            })
        },
        filerMyResults: (state, action) => {

            let addCard = [action.payload.add]

            // remove the del value from the filterList or add the add value to the filterList
            if (action.payload.del !== undefined) {
                state.filterList = state.filterList.filter(item => item !== action.payload.del)
            } else {
                state.filterList = [...state.filterList, ...addCard]
            }

            //This will be used to only display the filters type results
            state.filterList.length > 0 ? state.isFiltering = true : state.isFiltering = false

            // state.filteredCards = state.allCards.filter(item => item.type.includes(state.filterList))
            state.filteredCards = state.searchResults.filter(monster =>
                state.filterList.every(key => monster.race.includes(key) || monster.type.includes(key))//every() returns true if all elements in the array pass the test
            )
        },
        saveDeck: (state, action) => {
            // Save deck to state
            state.deck = [...state.deck, action.payload]
        },
        deleteCard: (state, action) => {
            // Delete card from deck
            state.deck = state.deck.filter(item => item.id !== action.payload)
        },
        showDeck: (state, action) => {
            // Toggle showDeck state
            state.showMyDeck = !state.showMyDeck
        },
        removeCard: (state, action) => {
            // Remove card from deck
            state.deck = state.deck.filter(item => item.id !== action.payload.id)
        },





    },
})

// Action creators are generated for each case reducer function
export const { loadCards, filter, saveDeck, showDeck, removeCard, filerMyResults } = state.actions

export default state.reducer