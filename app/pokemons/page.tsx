'use client';

import { fetchPokemon } from '@/libs/fetchPokemons';
import PokemonCard from '../../components/PokemonCard';
import { fetchPokemonDetails } from '@/libs/fetchPokemonDetails';
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

type searchParamsProp = {
  searchParams: {
    offset: number;
  };
};

type pokemonType = {
  next: string | null;
  previous: string | null;
  results: [{ name: string; url: string }];
};

export default function Pokemons({ searchParams }: searchParamsProp) {
  const [selectedPokemon, setSelectedPokemon] = useState<Record<string, any>>({
    name: 'hello',
  });
  const [pokemons, setPokemons] = useState<pokemonType>({
    next: '',
    previous: '',
    results: [{ name: '', url: '#' }],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchPokemonData = async () => {
        const offset = searchParams.offset * 20;
        const pokemon = await fetchPokemon(offset);
        setPokemons(pokemon);
      };
      fetchPokemonData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchEachPokemon = (results: [{ name: string; url: string }]) => {
    return results.map(async (e) => {
      const pokemonDetails = await fetchPokemonDetails(e.url);
      return (
        <div
          key={pokemonDetails.id}
          onClick={() => {
            setSelectedPokemon(pokemonDetails);
          }}
        >
          <PokemonCard
            name={pokemonDetails.name}
            types={pokemonDetails.types}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetails.id}.gif`}
          />
        </div>
      );
    });
  };

  return (
    <div className='w-[70%] m-auto'>
      {!isLoading ? (
        <>
          <main className='flex justify-center items-center'>
            <section className='grid grid-cols-auto-fit items-end justify-items-center gap-2 w-full'>
              {fetchEachPokemon(pokemons.results) as ReactNode}
            </section>
          </main>
          <footer className='flex gap-2 justify-center py-5'>
            <button
              className={` ${
                pokemons.previous === null ? 'hidden' : 'flex'
              } items-center gap-1 bg-slate-700 px-3 py-2 rounded-full hover:bg-slate-500`}
            >
              <BiLeftArrow />
              <Link
                href={{
                  pathname: '/pokemons',
                  query: { offset: Number(searchParams.offset) - 1 },
                }}
              >
                Prev
              </Link>
            </button>
            <button
              className={`${
                pokemons.next === null ? 'hidden' : 'flex'
              } items-center gap-1 bg-slate-700 px-3 py-2 rounded-full hover:bg-slate-500`}
            >
              <Link
                href={{
                  pathname: '/pokemons',
                  query: { offset: Number(searchParams.offset) + 1 },
                }}
              >
                Next
              </Link>
              <BiRightArrow />
            </button>
          </footer>
        </>
      ) : (
        <div className='w-full h-[50%] font-semibold text-2xl flex justify-center items-center'>
          Loading...
        </div>
      )}
    </div>
  );
}
