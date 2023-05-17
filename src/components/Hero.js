import React from 'react';
import Card from './Card.js';

export default function Hero() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[url('/img/webp/mobile-hero.webp')] md:bg-[url('/img/webp/hero.webp')] bg-no-repeat bg-top bg-contain md:bg-no-repeat md:bg-cover">
      <div className="z-10 w-full justify-center items-center font-mono text-sm lg:flex">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex-grow-0 text-center w-full p-4 md:p-24">
            <h1 className="font-japanese text-xl md:text-5xl mb-12 md:mb-0">
              Check out the right way to watch Anime
            </h1>
          </div>
          <div className="z-10 flex flex-row items-center justify-between w-full overflow-x-scroll md:overflow-hidden">            
          <div className="flex-shrink-0 mx-2 md:mx-5">
            <Card img={"demon-slayer"} title={"Demon Slayer"} />
          </div>
            <div className="flex-shrink-0 mx-2 md:mx-5">
              <Card img={"naruto"} title={"Naruto"} />
            </div>
            <div className="flex-shrink-0 mx-2 md:mx-5">
              <Card img={"codegeass"} title={"Code Geass"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
