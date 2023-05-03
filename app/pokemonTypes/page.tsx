'use client';
import { RootState } from '@/libs/store/store';
import { useSelector } from 'react-redux';
import React, {
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { fetchPokemonDetails } from '@/libs/fetchPokemonDetails';
import PokemonCard from '@/components/PokemonCard';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export default function PokemonTypes() {
  const [pokemonTypes, setPokemonTypes] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialNum = useRef(0);
  const finalNum = useRef(15);

  const router = useRouter();
  const pokemonType = useSelector(
    (state: RootState) => state.pokemonType.pokemonTypeData
  );

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchEachTypes = async () => {
        if (pokemonType !== '' && pokemonType) {
          const res = await fetchPokemonDetails(pokemonType);
          setPokemonTypes(res.pokemon);
        }
      };
      fetchEachTypes();
    } catch (error) {
      console.log(error);
    } finally {
      if (pokemonType) {
        initialNum.current = 0;
        finalNum.current = 15;
        setIsLoading(false);
      }
    }
  }, [pokemonType]);

  const fetchEachPokemon = (results: string) => {
    const fetchResult = async () => {
      const pokemonDetails = await fetchPokemonDetails(results);
      const photo = await fetch(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetails.id}.gif`
      );
      return (
        <button type='button' key={pokemonDetails.id}>
          <PokemonCard
            name={pokemonDetails.name}
            types={pokemonDetails.types}
            image={`${
              photo.status === 404
                ? null
                : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetails.id}.gif`
            }`}
          />
        </button>
      );
    };
    return fetchResult();
  };

  const handlePrevious = () => {
    finalNum.current = initialNum.current - 1;
    initialNum.current = initialNum.current - 16;
    router.refresh();
  };

  const handleNext = () => {
    initialNum.current = finalNum.current + 1;
    finalNum.current = finalNum.current + 16;
    router.refresh();
  };

  return (
    <div className='p-5 max-w-6xl'>
      {isLoading ? (
        <p className='text-xl font-medium'>Select A Pokemon Type ...</p>
      ) : (
        <>
          <main className='flex flex-wrap gap-5 w-full items-end justify-center'>
            {pokemonTypes.map((e, i) => {
              if (i >= initialNum.current && i < finalNum.current) {
                return (
                  <div key={e.pokemon.name}>
                    {fetchEachPokemon(e.pokemon.url) as unknown as ReactNode}
                  </div>
                );
              }
            })}
          </main>
          <footer className='m-auto w-fit flex  gap-2 p-5'>
            <button
              onClick={handlePrevious}
              className={`${initialNum.current === 0 ? 'hidden':'flex'} items-center gap-1 bg-slate-700 px-3 py-2 rounded-full hover:bg-slate-500`}
            >
              <BiLeftArrow />
              Prev
            </button>
            <button
              onClick={handleNext}
              className={`${finalNum.current >= pokemonTypes.length+1? 'hidden' : 'flex'} items-center gap-1 bg-slate-700 px-3 py-2 rounded-full hover:bg-slate-500`}
            >
              Next
              <BiRightArrow />
            </button>
          </footer>
        </>
      )}
    </div>
  );
}
