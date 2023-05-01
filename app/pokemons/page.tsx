'use client'

import { fetchPokemon } from '@/libs/fetchPokemons';
import PokemonCard from '../../components/PokemonCard';
import { fetchPokemonDetails } from '@/libs/fetchPokemonDetails';
import { ReactNode } from 'react';
import Link from 'next/link';
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi'

type searchParamsProp = {
  searchParams: {
    offset: number;
  };
};

export default async function Pokemons({ searchParams }: searchParamsProp) {
  const offset = searchParams.offset * 20;
  const pokemons = await fetchPokemon(offset);

  const fetchEachPokemon = (results: [{ name: string; url: string }]) => {
    return results.map(async (e) => {
      const pokemonDetails = await fetchPokemonDetails(e.url);
      return <PokemonCard key={pokemonDetails.id} name={pokemonDetails.name} types={pokemonDetails.types} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetails.id}.gif`} />;
    });
  };

  return (
    <div>
      <main className='flex justify-center items-center'>
        <section className='grid grid-cols-auto-fit items-end justify-items-center gap-2 w-full'>{fetchEachPokemon(pokemons.results) as ReactNode}</section>
      </main>
      <footer className='flex gap-2 justify-center py-5'>
        <button hidden={pokemons.previous === null} className='flex items-center gap-1 bg-slate-700 px-3 py-2 rounded-full hover:bg-slate-500'>
          <BiLeftArrow/>
          <Link href={{ pathname: '/pokemons', query: { offset: Number(searchParams.offset) - 1 } }}>Prev</Link>
        </button>
        <button hidden={pokemons.next === null} className='flex items-center gap-1 bg-slate-700 px-3 py-2 rounded-full hover:bg-slate-500'>
          <Link href={{ pathname: '/pokemons', query: { offset: Number(searchParams.offset) + 1 } }}>Next</Link>
          <BiRightArrow/>
        </button>
      </footer>
    </div>
  );
}
