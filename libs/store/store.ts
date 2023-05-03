'use client'

import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from './features/pokemonData/pokemonSlice';
import pokemonTypeReducer from './features/pokemonType/pokemonTypeSlice'

export const store = configureStore({
  reducer:{
    pokemonData: pokemonReducer,
    pokemonType: pokemonTypeReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
