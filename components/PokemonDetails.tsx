'use client';

import React from 'react';
import { RootState } from '@/libs/store/store';
import { useSelector } from 'react-redux';
import { typeColors, TypeColors } from './PokemonCard';
import Image from 'next/image';

const PokemonDetails = () => {
  const pokemonDetails = useSelector(
    (state: RootState) => state.pokemonData.pokemonDetails
  );

  const handleColor = (type: string) => {
    return typeColors[type as keyof TypeColors];
  };

  return (
    <div className=' w-full h-[calc(100vh-150px)] border rounded-md overflow-hidden'>
      <main className=' w-full h-full flex flex-col justify-center items-center'>
        {pokemonDetails.name ? (
          <main className='w-full h-full flex flex-col items-center'>
            <div className='p-5 border-b-[1px] w-full flex flex-col items-center gap-4'>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetails.id}.gif`}
                alt='Image'
                width={80}
                height={80}
              />
              <h2 className='text-xl font-semibold'>
                {pokemonDetails?.name[0].toUpperCase() +
                  pokemonDetails?.name.substring(1)}
              </h2>
            </div>
            <div className='overflow-y-auto w-full flex flex-col items-center'>
              <main className='flex gap-4 p-4'>
                <h1 className='text-lg font-semibold'>Types:</h1>
                {pokemonDetails.types.map(
                  (e: { type: { name: string } }, index: number) => (
                    <p
                      key={index}
                      className='px-3 py-1 rounded-full shadow-sm shadow-black font-medium textShadow'
                      style={{ backgroundColor: `${handleColor(e.type.name)}` }}
                    >
                      {e.type.name[0].toUpperCase() + e.type.name.substring(1)}
                    </p>
                  )
                )}
              </main>
              <h1 className='flex gap-2 font-semibold'>
                <p>Weight:</p>
                {pokemonDetails.weight} /
                <p>Height:</p>
                {pokemonDetails.height}
              </h1>
              <section className='p-5'>
                <h1 className='text-lg font-semibold'>Moves:</h1>
                <main className='flex gap-2 flex-wrap p-1'>
                  {pokemonDetails.moves.map((e: { move: { name: string } },index:number) => (
                    <p key={index} className='bg-slate-700 p-3 w-40 rounded-lg m-auto'>
                      {e.move.name}
                    </p>
                  ))}
                </main>
              </section>
            </div>
          </main>
        ) : (
          <h1 className='text-xl font-semibold'>Select A Pokemon</h1>
        )}
      </main>
    </div>
  );
};

export default PokemonDetails;
