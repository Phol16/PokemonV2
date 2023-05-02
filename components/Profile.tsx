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
      <main className='text-center text-black text-xl font-semibold'>
        <h1>Profile</h1>
      </main>
    </div>
  );
};

export default Profile;
