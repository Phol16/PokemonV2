'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Profile from './Profile';
import { BiUser } from 'react-icons/bi';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className='fixed w-full bg-slate-950 z-10 border-b-[1px]'>
      <section className=' p-4 flex items-center justify-between'>
      <h1 className='text-xl font-semibold'>
        <Link href='/'>Pokemon</Link>
      </h1>
      <button onClick={() => setOpen(!open)} className=' flex gap-1 bg-slate-700 px-4 py-2 rounded-full hover:bg-slate-500 transition'>
        <BiUser size={24} />
        <p>Profile</p>
      </button>
      </section>
      {open && (
        <main className='fixed top-0 flex justify-end w-full h-full'>
          <div onClick={()=>setOpen(false)} className='absolute bg-black/90 w-full h-full'></div>
          <Profile />
        </main>
      )}
    </nav>
  );
}
