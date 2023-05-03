import Image from 'next/image'
import React from 'react'
import ash from '../../public/ash.svg'

const loading = () => {
  return (
    <div className='w-full h-full font-semibold text-xl flex flex-col gap-4 justify-center items-center p-5 '>
      Fetching Pokemons
      <Image src={ash} alt='BGImage' width={200}/>
    </div>
  )
}

export default loading