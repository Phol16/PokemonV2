import React from 'react';
import ash from '../../public/ash.svg'
import Image from 'next/image';

const Loading = () => {
  return (
    <div className='w-full h-full font-semibold text-xl flex flex-col gap-4 justify-center items-center p-5'>
      Fetching Pokemon Information
      <Image src={ash} alt='BGImage' width={200}/>
    </div>
  );
};

export default Loading;
