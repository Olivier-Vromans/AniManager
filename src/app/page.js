'use client'
import { useEffect, useState } from 'react';
import Hero from '@/app/Hero.js';
import Image from 'next/image.js';

export default function Home() {
  const [genres, setGenres] = useState(['isekai', 'drama', 'action', 'romance', 'horror']);


  return (
    <main>
      <Hero />
      <div className="container my-16">
        <div id="genres" className='flex flex-col '>
          <div className='flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between w-full pb-8'>
            <h2 className="text-2xl md:text-3xl font-bold text-center lg:text-left font-japanese ">Popular Genres</h2>
            <a href='/genre' className='btn-secondary'>
              More Genres
            </a>
          </div>
          {/* TODO Change to dynamic genres */}
          <div className='flex flex-wrap lg:flex-row justify-around lg:justify-between w-full  items-baseline'>
            {genres.map((genre) => (
              <div key={genre} className='flex flex-col justify-center m-2 md:m-0 items-center w-44 h-64 lg:w-52 lg:h-64 2xl:w-64 2xl:h-96 relative'>
                <Image
                  className='opacity-60 rounded-xl object-cover'
                  src={`/img/webp/genre/${genre}.webp`}
                  alt={genre}
                  fill
                />
                <p className='md:text-2xl font-bold text-center font-japanese absolute'>{genre}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
