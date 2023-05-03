'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface PokemonState {
  pokemonTypeData: string;
}
const initialState: PokemonState = {
  pokemonTypeData: '',
};

export const pokemonTypeSlice = createSlice({
  name: 'pokemonType',
  initialState,
  reducers: {
    storePokemonType: (state, action) => {
      state.pokemonTypeData = action.payload;
    },
  },
});

export const { storePokemonType } = pokemonTypeSlice.actions;
export default pokemonTypeSlice.reducer;
