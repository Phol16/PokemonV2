import type { Metadata } from 'next';
import Image from 'next/image';
import pokeBall from '@/public/pokeball.svg';

export const metadata: Metadata = {
  title: 'Pokemon Lists',
  description: 'A web-based application',
};

export default function PokemonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mt-20 flex'>
    <aside className='flex-[2] h-[calc(100%_-_72px)] overflow-auto p-10'>
      <h1 className='text-xl font-semibold text-center'>Pokemons</h1>
      {children}
    </aside>
    <aside className='flex-[1] relative hidden md:flex'>
      <main className='fixed border-l-[1px] h-full p-4'>
        <h1 className=' relative'>Pokemon Details</h1>
      </main>
    </aside>
    <Image src={pokeBall} alt='BGImage' className='fixed w-[300px] 2xl:w-[500px] -z-10 brightness-75 bottom-20 -left-10 rotate-[-25deg]' />
  </div>
  );
}