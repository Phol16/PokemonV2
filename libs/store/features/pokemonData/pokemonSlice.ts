'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface PokemonState {
  pokemonDetails: Record<string, any>;
}
const initialState: PokemonState = {
  pokemonDetails: {},
};

export const pokemonSlice = createSlice({
  name: 'pokemonData',
  initialState,
  reducers: {
    storePokemonData: (state, action) => {
      state.pokemonDetails = action.payload;
    },
  },
});

export const { storePokemonData } = pokemonSlice.actions;
export default pokemonSlice.reducer;
