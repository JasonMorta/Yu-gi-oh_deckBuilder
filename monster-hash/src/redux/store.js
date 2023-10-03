import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from "./counterReducers";//
import cardsState from "./cardsState"

export const store = configureStore({
    reducer: {
        cardsState: cardsState,
    }
})