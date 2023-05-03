import PokemonTypesNav from '@/components/PokemonTypesNav';
import { Providers } from '@/libs/store/Provider';
import Link from 'next/link';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

export default function PokemonTypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mt-20 flex flex-col items-center w-full p-5'>
      <header className=' flex items-center gap-2 text-3xl font-semibold justify-center p-5'>
        <Link href={'/'}>
          <BiArrowBack />
        </Link>
        <h1>Pokemons Types</h1>
      </header>
      <Providers>
        <PokemonTypesNav />
        {children}
      </Providers>
    </div>
  );
}
