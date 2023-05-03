import Image from 'next/image';
import Link from 'next/link';
import charizard from '@/public/charizard.svg';
import bulbasur from '@/public/bulbasur.svg';
import blastoise from '@/public/blastoise.svg';

const buttonInfo = [
  {
    label: 'All Pokemons',
    redirect: '/pokemons?offset=0',
  },
  {
    label: 'Pokemon Types',
    redirect: '/pokemonTypes',
  },
];

export default async function Home() {
  return (
    <div className=' relative p-5 flex flex-col gap-5 justify-center items-center h-[100svh] w-full '>
      <h1 className='text-3xl lg:text-5xl font-semibold textShadow text-center'>
        Welcome! Pokemon Trainers
      </h1>
      <h2 className='textShadow'>This is the pokeDex.</h2>
      <main className='flex gap-2'>
        {buttonInfo.map((element, index) => (
          <button
            key={index}
            className='bg-azure p-3 rounded-full hover:bg-sky-900 text-sm lg:text-lg '
          >
            <Link href={element.redirect}>{element.label}</Link>
          </button>
        ))}
      </main>
      <section className='absolute h-screen w-full -z-10 brightness-50'>
        <Image
          src={charizard}
          alt='BGImage'
          className='fixed bottom-3 hidden md:flex w-[300px]'
        />
        <Image
          src={bulbasur}
          alt='BGImage'
          className='sticky left-[50%] top-[15%] hidden md:flex w-[200px]'
        />
        <Image
          src={blastoise}
          alt='BGImage'
          className='fixed bottom-3 right-0 w-[250px]'
        />
      </section>
    </div>
  );
}
