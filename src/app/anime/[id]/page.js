"use client";
import Image from "next/image.js";
import { useState, useEffect, useCallback } from "react";

export default function AnimeDetail({ params }) {
  // console.log(params);
  const [y, setY] = useState(0);

  const [series, setSeries] = useState({
    title: 'Code Geass',
    poster: '/img/webp/series/code-geass/poster.webp',
    banner: '/img/webp/series/code-geass/banner.jpg',
    genres: [],
    order: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setY(Math.min(window.scrollY, 320));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      <div className="container">
        <div
          className="flex flex-col items-center justify-between mb-24 mt-48 w-full h-80 bg-cover bg-no-repeat bg-[url('/img/webp/series/code-geass/banner.jpg')]"
          style={{ backgroundPositionY: `calc(-${y}px)` }}
        >
          {/* Add your banner content here */}
        </div>
        <div className="container flex flex-row items-center mb-24">
          <div className="flex-initial">
            <Image className='' src={series.poster} alt={series.title} width={400} height={500} />
          </div>
          <div className="flex-1 ml-6">
            <h2 className='text-2xl'>Code Geass</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
