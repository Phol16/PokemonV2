import type { Metadata } from 'next';
import Image from 'next/image';
import pokeBall from '@/public/pokeball.svg';
import PokemonDetails from '@/components/PokemonDetails';
import { Providers } from '@/libs/store/Provider';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pokemon Lists',
  description: 'A web-based application',
};

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mt-20 flex'>
      <Providers>
        <aside className='flex-[2] h-[calc(100%_-_70px)] overflow-auto p-10'>
          <header className=' flex items-center gap-2 text-3xl font-semibold justify-center p-5'>
            <Link href={'/'}><BiArrowBack/></Link>
            <h1>Pokemons</h1>
          </header>
          {children}
        </aside>
        <aside className='flex-[1] relative hidden md:flex'>
          <main className='fixed border-l-[1px] h-full w-[31.5%] p-4'>
            <h1 className='text-center text-lg font-medium'>Pokemon Details</h1>
            <PokemonDetails />
          </main>
        </aside>
      </Providers>
      <Image
        src={pokeBall}
        alt='BGImage'
        className='fixed w-[300px] 2xl:w-[500px] -z-10 brightness-75 bottom-20 left-8 rotate-[-25deg]'
      />
    </div>
  );
}
