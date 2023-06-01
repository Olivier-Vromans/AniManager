'use client'
import { useEffect, useState } from 'react';
import Hero from '@/app/Hero.js';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint if needed
    };

    handleResize(); // Set initial screen size
    window.addEventListener('resize', handleResize); // Update screen size on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener
    };
  }, []);

  return (
    <main>
      <Hero />
        <div className="container my-16">
          <div id="genres" className='flex flex-col '>
            <div className='flex flex-row flex-wrap items-center justify-center md:justify-between w-full pb-8'>
              <h2 className="text-2xl md:text-3xl font-bold text-center lg:text-left font-japanese ">Popular Genres</h2>
              <a href='/genre' className='rounded-full py-4 px-8 bg-red-500 text-white font-bold shadow-lg uppercase tracking-wider'>
                More Genres
              </a>
            </div>
            {/* TODO Change to dynamic genres */}
            <div className='flex flex-wrap lg:flex-row justify-around lg:justify-between w-full space-y-6 items-baseline'>
              {/* four clickable images with an opacity of 60% with a title on top of it slight down from the center */}
              <div className='flex flex-col justify-center items-center w-40 h-64 md:w-64 md:h-96 relative'>
                <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/isekai.webp' alt='isekai' />
                <p className='md:text-2xl font-bold text-center font-japanese absolute'>isekai</p>
              </div>
              <div className='flex flex-col justify-center items-center w-40 h-64 md:w-64 md:h-96 relative'>
                <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/drama.webp' alt='isekai' />
                <p className='md:text-2xl font-bold text-center font-japanese absolute'>drama</p>
              </div>
              <div className='flex flex-col justify-center items-center w-40 h-64 md:w-64 md:h-96 relative'>
                <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/action.webp' alt='action' />
                <p className='md:text-2xl font-bold text-center font-japanese absolute'>Action</p>
              </div>
              <div className='flex flex-col justify-center items-center w-40 h-64 md:w-64 md:h-96 relative'>
                <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/romance.webp' alt='romance' />
                <p className='md:text-2xl font-bold text-center font-japanese absolute'>Romance</p>
              </div>
              {/* Render the "Horror" div only if it's not mobile */}
              {!isMobile && (
                <div className='flex flex-col justify-center items-center w-44 h-64 md:w-64 md:h-96 relative'>
                  <img className='opacity-60 rounded-xl object-cover w-full h-full' src='/img/webp/genre/horror.webp' alt='horror' />
                  <p className='md:text-2xl font-bold text-center font-japanese absolute'>Horror</p>
                </div>
              )}
            </div>
          </div>
        </div>
    </main>
  );
}
