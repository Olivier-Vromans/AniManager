import React from 'react';
import Card from '../components/Card.js';

export default function Hero() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[url('/img/webp/mobile-hero.webp')] md:bg-[url('/img/png/itachi.png')] bg-no-repeat bg-top bg-cover md:bg-no-repeat md:bg-cover">
      <div className=" w-full justify-center items-center font-mono text-sm sm:flex">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-col text-center items-center w-full p-4 sm:p-24">
            <h1 className="font-japanese text-xl md:text-5xl mb-12 md:mb-0">
              Check out the right way to watch Anime
            </h1>
            <a href='/anime' className='btn-secondary hover:opacity-100 uppercase mb-4 sm:mt-4' >
                Browse the library
            </a>
          </div>
          <div id='featured' className="z-10 flex flex-row items-center justify-between w-full overflow-x-scroll sm:overflow-hidden">
            {/* TODO Change to dynamic feature */}
            <div className="flex-shrink-0 mx-2 sm:mx-5">
              <Card img={"demon-slayer"} title={"Demon Slayer"} id={1} />
            </div>
            <div className="flex-shrink-0 mx-2 sm:mx-5">
              <Card img={"naruto"} title={"Naruto"} id={2} />
            </div>
            <div className="flex-shrink-0 mx-2 sm:mx-5">
              <Card img={"anime/lelouch-of-the-rebellion/poster"} title={"Code Geass"} id={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
