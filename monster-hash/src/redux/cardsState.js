import { createSlice } from '@reduxjs/toolkit'

//set all state initial values
const initialState = {
    allCards: [],
    filteredCards: [],
    deck: [],
    savedDecks: [],
    edit: false,
    currentEdit: null,

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
            console.log('state.allCards', state.allCards)

            // Filter cards by name or description
            // Also ignore case-sensitivity
            state.filteredCards = state.allCards.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()) || item.desc.toLowerCase().includes(action.payload.toLowerCase()))
        },
        saveDeck: (state, action) => {
            // Save deck to state
            state.deck = [...state.deck, action.payload]
        },
        deleteCard: (state, action) => {
            // Delete card from deck
            state.deck = state.deck.filter(item => item.id !== action.payload)
        },





    },
})

// Action creators are generated for each case reducer function
export const { loadCards, filter, saveDeck } = state.actions

export default state.reducer