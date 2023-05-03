'use client';
import { fetchPokemonTypes } from '@/libs/fetchPokemonTypes';
import React, { useEffect, useState } from 'react';
import { TypeColors, typeColors } from './PokemonCard';
import { useDispatch } from 'react-redux';
import { storePokemonType } from '@/libs/store/features/pokemonType/pokemonTypeSlice';

type PokemonType = {
  name: string;
  url: string;
};

const PokemonTypesNav = () => {
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const handleColor = (type: string) => {
    return typeColors[type as keyof TypeColors];
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchTypes = async () => {
        const res = await fetchPokemonTypes();
        setPokemonTypes(res);
      };
      fetchTypes();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className='p-4 rounded-md flex flex-col gap-5 max-w-xl items-center bg-slate-900'>
      <h1 className='text-xl font-semibold'>Select Type:</h1>
      <main className=' flex flex-wrap gap-2 justify-center'>
        {pokemonTypes.map((element, index: number) => (
          <button
            onClick={() => {
              dispatch(storePokemonType(element.url));
            }}
            key={element.name}
            style={{ backgroundColor: `${handleColor(element.name)}` }}
            className=' textShadow font-medium p-2 rounded-full w-[100px] hover:rounded-xl transition duration-300 shadow-sm shadow-black hover:scale-110'
          >
            {element.name[0].toUpperCase() + element.name.substring(1)}
          </button>
        ))}
      </main>
    </div>
  );
};

export default PokemonTypesNav;
