import Image from 'next/image';
import React from 'react';

type PokemonInfoProps = {
  name: string;
  image: string;
  types: Record<string, any>[];
};

export type TypeColors = {
  normal: string;
  fighting: string;
  flying: string;
  poison: string;
  ground: string;
  rock: string;
  bug: string;
  ghost: string;
  steel: string;
  fire: string;
  water: string;
  grass: string;
  electric: string;
  psychic: string;
  ice: string;
  dragon: string;
  dark: string;
  fairy: string;
  shadow: string;
};

export const typeColors = {
  normal: '#BCBCAC',
  fighting: '#BC5442',
  flying: '#669AFF',
  poison: '#AB549A',
  ground: '#DEBC54',
  rock: '#BCAC66',
  bug: '#ABBC1C',
  ghost: '#6666BC',
  steel: '#ABACBC',
  fire: '#FF421C',
  water: '#2F9AFF',
  grass: '#78CD54',
  electric: '#FFCD30',
  psychic: '#FF549A',
  ice: '#78DEFF',
  dragon: '#7866EF',
  dark: '#785442',
  fairy: '#FFACFF',
  shadow: '#0E2E4C',
};

const PokemonCard = ({ name, image, types }: PokemonInfoProps) => {
  const handleColor = (type: string) => {
    return typeColors[type as keyof TypeColors];
  };
  return (
    <div className='group'>
      <div className=' relative w-[200px] flex flex-col items-center justify-end group-hover:-translate-y-1 transition cursor-pointer'>
        <Image
          src={image}
          width={60}
          height={80}
          alt='Photo'
          className='relative top-5 aspect-auto'
        />
        <main className=' bg-azure group-hover:bg-sky-600 w-full flex flex-col items-center gap-3 py-7 px-1 rounded-lg'>
          <h1 className='textShadow'>
            {name[0].toUpperCase() + name.substring(1)}
          </h1>
          <section className='flex gap-3'>
            {types.map((element, index) => (
              <p
                key={index}
                className='px-3 py-1 rounded-full shadow-sm shadow-black font-medium textShadow'
                style={{ backgroundColor: `${handleColor(element.type.name)}` }}
              >
                {element.type.name[0].toUpperCase() +
                  element.type.name.substring(1)}
              </p>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default PokemonCard;
