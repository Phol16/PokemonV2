'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { storePokemonData } from '@/libs/store/features/pokemonData/pokemonSlice';
import { fetchPokemon } from '@/libs/fetchPokemons';
import { fetchPokemonDetails } from '@/libs/fetchPokemonDetails';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import PokemonCard from '../../components/PokemonCard';
import Link from 'next/link';

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
  const offset = searchParams.offset * 20;
  const dispatch = useDispatch();
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
        const pokemon = await fetchPokemon(offset);
        setPokemons(pokemon);
      };
      fetchPokemonData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [offset]);

  const fetchEachPokemon = (results: [{ name: string; url: string }]) => {
    return results.map(async (e) => {
      if (e.url !== '#') {
        const pokemonDetails = await fetchPokemonDetails(e.url);
        return (
          <button
            type='button'
            key={pokemonDetails.id}
            onClick={() => {
              dispatch(storePokemonData(pokemonDetails));
            }}
          >
            <PokemonCard
              name={pokemonDetails.name}
              types={pokemonDetails.types}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetails.id}.gif`}
            />
          </button>
        );
      }
      return (
        <div
          key={'loading'}
          className='w-full h-[50%] font-semibold text-2xl flex justify-center items-center'
        >
          Loading...
        </div>
      );
    });
  };

  return (
    <div className='w-[80%] m-auto'>
      {!isLoading ? (
        <>
          <main className='flex justify-center items-center'>
            <section className='grid grid-cols-auto-fit items-end justify-items-center gap-2 w-full'>
              {fetchEachPokemon(pokemons.results) as ReactNode}
            </section>
          </main>
          <footer className='flex gap-2 justify-center py-5'>
            <Link
              href={{
                pathname: '/pokemons',
                query: { offset: Number(searchParams.offset) - 1 },
              }}
            >
              <button
                className={` ${
                  pokemons.previous === null ? 'hidden' : 'flex'
                } items-center gap-1 bg-slate-700 px-3 py-2 rounded-full hover:bg-slate-500`}
              >
                <BiLeftArrow />
                Prev
              </button>
            </Link>
            <Link
              href={{
                pathname: '/pokemons',
                query: { offset: Number(searchParams.offset) + 1 },
              }}
            >
              <button
                className={`${
                  pokemons.next === null ? 'hidden' : 'flex'
                } items-center gap-1 bg-slate-700 px-3 py-2 rounded-full hover:bg-slate-500`}
              >
                Next
                <BiRightArrow />
              </button>
            </Link>
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
