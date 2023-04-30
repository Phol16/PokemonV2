import { fetchPokemon } from '@/libs/fetchPokemons';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemonDetails } from '@/libs/fetchPokemonDetails';
import { ReactNode } from 'react';
import Image from 'next/image';
import pokeBall from '../../public/pokeball.svg'

export default async function Pokemons() {
  const pokemons = await fetchPokemon();
  
  const fetchEachPokemon =(results:[{name:string, url:string}]) => {
    return results.map(async(e)=>{
      const pokemonDetails = await fetchPokemonDetails(e.url)
      return (<PokemonCard name={pokemonDetails.name} types={pokemonDetails.types} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetails.id}.gif`} />);
    })
  };

  return (
    <div className='mt-20 flex'>
      <aside className='flex-[2] h-[calc(100%_-_72px)] overflow-auto p-10'>
      <h1 className='text-xl font-semibold text-center'>Pokemons</h1>
      <main className='flex justify-center items-center  '>
        <section className='grid grid-cols-auto-fit items-end justify-items-center gap-2 w-full'>
      {fetchEachPokemon(pokemons.results) as ReactNode}
      </section>
      </main>
      <footer className='flex gap-2 justify-center py-5'>
        <button>Previous</button>
        <button>next</button>
      </footer>
      </aside>
      <aside className='flex-[1] relative border-l-[1px] p-2 hidden md:flex'>
        <main className='fixed'>
          <h1 className=' relative'>Pokemon Details</h1>
        </main>
      </aside>
      <Image src={pokeBall} alt='BGImage' className='fixed w-[300px] 2xl:w-[500px] -z-10 brightness-75 bottom-20 -left-10 rotate-[-25deg]'/>
    </div>
  );
}
