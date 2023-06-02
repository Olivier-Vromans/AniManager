'use client'
import { useEffect, useState } from 'react';
import Hero from '@/app/Hero.js';

export default function Home() {
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
            {/* four clickable images with an opacity of 60% with a title on top of it slight down from the center */}
            <div className='flex flex-col justify-center m-2 md:m-0 items-center w-44 h-64 lg:w-52 lg:h-64 2xl:w-64 2xl:h-96 relative'>
              <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/isekai.webp' alt='isekai' />
              <p className='md:text-2xl font-bold text-center font-japanese absolute'>isekai</p>
            </div>
            <div className='flex flex-col justify-center m-2 md:m-0 items-center w-44 h-64 lg:w-52 lg:h-64 2xl:w-64 2xl:h-96 relative'>
              <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/drama.webp' alt='isekai' />
              <p className='md:text-2xl font-bold text-center font-japanese absolute'>drama</p>
            </div>
            <div className='flex flex-col justify-center m-2 md:m-0 items-center w-44 h-64 lg:w-52 lg:h-64 2xl:w-64 2xl:h-96 relative'>
              <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/action.webp' alt='action' />
              <p className='md:text-2xl font-bold text-center font-japanese absolute'>Action</p>
            </div>
            <div className='flex flex-col justify-center m-2 md:m-0 items-center w-44 h-64 lg:w-52 lg:h-64 2xl:w-64 2xl:h-96 relative'>
              <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/romance.webp' alt='romance' />
              <p className='md:text-2xl font-bold text-center font-japanese absolute'>Romance</p>
            </div>
            <div className=' hidden sm:flex flex-col justify-center m-2 md:m-0 items-center w-44 h-64 lg:w-52 lg:h-64 2xl:w-64 2xl:h-96 relative'>
              <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/horror.webp' alt='horror' />
              <p className='md:text-2xl font-bold text-center font-japanese absolute'>Horror</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
