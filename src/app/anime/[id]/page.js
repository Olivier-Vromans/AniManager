"use client";
import Image from "next/image.js";
import { useState, useEffect } from "react";

export default function AnimeDetail({ params }) {
  const [activeFilter, setActiveFilter] = useState('release');
  const [series, setSeries] = useState({
    title: 'Code Geass',
    anime: [
      {
        id: 1,
        title: 'Lelouch of the Rebellion',
        poster: '/img/webp/anime/lelouch-of-the-rebellion/poster.webp',
        banner: '/img/webp/anime/lelouch-of-the-rebellion/banner.webp',
        genres: [],
        episodes: [
          {
            id: 1,
            title: 'The Day a New Demon was Born',
            episode: 1,
            filler: false,
            dubbed: true,
          },
          {
            id: 2,
            title: 'The White Knight Awakens',
            episode: 2,
            filler: false,
            dubbed: true,
          },
        ],
      },
      {
        id: 2,
        title: 'Lelouch of the Rebellion R2',
        poster: '/img/webp/anime/lelouch-of-the-rebellion-r2/poster.webp',
        banner: '/img/webp/anime/lelouch-of-the-rebellion-r2/banner.webp',
        genres: [],
        episodes: [
          {
            id: 1,
            title: 'The Day a New Demon was Born',
            episode: 1,
            filler: false,
            dubbed: true,
          },
          {
            id: 2,
            title: 'The White Knight Awakens',
            episode: 2,
            filler: false,
            dubbed: true,
          },
        ],
      },
      // Add more anime objects if needed
    ],
    genres: [],
    order: 0,
  });

  
  const [banner, setBanner] = useState();
  const [poster, setPoster] = useState();

  const [y, setY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Randomize the banner and poster images
    const randomizeImages = () => {
      const anime = series.anime;
      const randomBannerIndex = Math.floor(Math.random() * anime.length);
      const randomPosterIndex = Math.floor(Math.random() * anime.length);
      setBanner(anime[randomBannerIndex].banner);
      setPoster(anime[randomPosterIndex].poster);
    };

    // Determine if the user is scrolling up or down and adjust the banner accordingly
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint if needed
    };

    handleResize(); // Set initial screen size
    window.addEventListener('resize', handleResize); // Update screen size on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener
    };

    randomizeImages();
  });

  useEffect(() => {
    const handleScroll = () => {
      setY(Math.min(window.scrollY, 320));
    };

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);


  const Filter = ({ activeFilter, setActiveFilter }) => {
    return (
      <div id="filters" className="flex flex-col">
        <p className="hidden sm:block text-lg font-gilroy text-subtext">Order</p>
        <div className="flex flex-row items-center justify-around w-full mb-4">
          <button
            className={`${activeFilter === 'release' ? 'btn' : 'btn-inactive'} py-2 px-4 rounded-sm`}
            onClick={() => setActiveFilter('release')}
          >
            Release
          </button>
          <button
            className={`${activeFilter === 'chronicle' ? 'btn' : 'btn-inactive'} py-2 px-4 rounded-sm`}
            onClick={() => setActiveFilter('chronicle')}
          >
            Chronicle
          </button>
          <button
            className={`${activeFilter === 'community' ? 'btn' : 'btn-inactive'} py-2 px-4 rounded-sm`}
            onClick={() => setActiveFilter('community')}
          >
            Community
          </button>
        </div>
      </div>
    );
  };


  return (
    <main>
      <div className="container">
        <div
          className="flex flex-col items-center justify-between mb-12 mt-28 w-full h-36 bg-cover bg-no-repeat"
          style={{
            backgroundPositionY: `calc(-${y}px)`,
            backgroundImage: `url(${banner})`
          }}
        ></div>
        <div className="container flex flex-row mb-24">
          <div id="poster" className="flex-initial">
            <Image className="md:mb-4 hidden md:block w-full" src={poster} alt={series.title} width={250} height={350} />
            {!isMobile && <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}
          </div>
          <div id="order" className="flex-1 md:ml-6">
            <p className='font-japanese text-center text-4xl md:mb-8'>{series.title} Watch Order</p>
            {isMobile && <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}
            <div className="flex flex-col flex-wrap items-center justify-center md:justify-start w-full pb-8">
              {series.anime.map((anime) => (
                <div key={anime.id} className="flex flex-row items-center justify-center w-full mb-4 sm:mb-0 md:m-6">
                  <Image
                    className='w-32 h-32 md:w-1/2 lg:w-1/6 object-contain'
                    src={anime.poster}
                    alt={anime.title}
                    width={100}
                    height={100}
                    loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`} />
                  <div className='flex-1'>
                    <p className='text-center md:text-start md:text-2xl'>{anime.title}</p>
                    <p className="text-center md:text-start md:text-xl text-subtext font-extrabold">{`Episode ${anime.episodes[0].episode} - ${anime.episodes[anime.episodes.length - 1].episode}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
