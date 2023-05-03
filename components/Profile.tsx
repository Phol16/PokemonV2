import React from 'react';
import Image from 'next/image';
import ash from '@/public/ash.svg';

const Profile = () => {
  return (
    <div className='relative flex-[0.5_0.8_auto] bg-babyPowder h-full py-2'>
      <Image
        src={ash}
        alt='BGImage'
        className='absolute bottom-0 -left-60 hidden md:flex brightness-90'
      />
      <main className=' text-black text-xl font-semibold flex flex-col justify-between h-full'>
        <h1 className='text-center'>Profile</h1>
        <main className='flex flex-col'>
          <button className='bg-slate-600 text-white p-4 hover:bg-slate-500 transition duration-100'>My Pokemons</button>
        </main>
        <footer className='text-center'>
          Pokemon
        </footer>
      </main>
    </div>
  );
};

export default Profile;
