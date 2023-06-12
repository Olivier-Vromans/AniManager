"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

async function getData(serieId) {
  try {
    const response = await axios.get(`/api/series/${serieId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default function AnimeDetail({ params }) {
  const [activeFilter, setActiveFilter] = useState("release");
  const [series, setSeries] = useState(null);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const data = await getData(params.id);
        if (data && data.anime) {
          data.anime.forEach((anime) => {
            const seriesTitle = data.title.toLowerCase().replace(/\s/g, "-");
            const animeTitle = anime.title.toLowerCase().replace(/\s/g, "-");
            anime.poster = `/img/webp/${seriesTitle}/${animeTitle}/poster.webp`;
            anime.banner = `/img/webp/${seriesTitle}/${animeTitle}/banner.webp`;
          });
        }
        console.log(data);
        setSeries(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSeries();
  }, [params.id]);

  const seriesName = useMemo(() => series ? series.serie_name.toLowerCase().replace(/\s/g, '-') : '', [series]);

  const randomBanner = useMemo(() => {
    if (series && series.animes.length > 0) {
      const randomBannerIndex = Math.floor(Math.random() * series.animes.length);
      const animeTitle = series.animes[randomBannerIndex].title.toLowerCase().replace(/\s/g, '-');
      return `/img/anime/${seriesName}/${animeTitle}/${series.animes[randomBannerIndex].banner}`;
    }
    return '';
  }, [series, seriesName]);

  const randomPoster = useMemo(() => {
    if (series && series.animes.length > 0) {
      const randomPosterIndex = Math.floor(Math.random() * series.animes.length);
      const animeTitle = series.animes[randomPosterIndex].title.toLowerCase().replace(/\s/g, '-');
      return `/img/anime/${seriesName}/${animeTitle}/${series.animes[randomPosterIndex].poster}`;
    }
    return '';
  }, [series, seriesName]);



  const [y, setY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Determine if the user is scrolling up or down and adjust the banner accordingly
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint if needed
    };

    handleResize(); // Set initial screen size
    window.addEventListener('resize', handleResize); // Update screen size on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener
    };
  }, [series]);

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

  if (!series) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <main>
      <div className="container">
        <div
          className="flex flex-col items-center justify-between mb-12 mt-28 w-full h-36 bg-cover bg-no-repeat"
          style={{
            backgroundPositionY: `calc(-${y}px)`,
            backgroundImage: series ? `url(${randomBanner})` : "none"
          }}
        />
        <div className="container flex flex-row mb-24">
          <div id="poster" className="flex-initial">
            <Image
              className="md:mb-4 hidden md:block w-full"
              src={randomPoster}
              alt={`${series.serie_name} Banner`}
              width={250}
              height={350}
            />
            {!isMobile && <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}
          </div>
          <div id="order" className="flex-1 md:ml-6">
            <p className="font-japanese text-center text-4xl md:mb-8">{series.title} Watch Order</p>
            {isMobile && <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}
            <div className="flex flex-col flex-wrap items-center justify-center md:justify-start w-full pb-8">
              {series.animes.map((anime) => (
                <div key={anime.anime_id} className="flex flex-row items-center justify-center w-full mb-4 sm:mb-0 md:m-6">
                  <Image
                    className="w-32 h-32 md:w-1/2 lg:w-1/6 object-contain"
                    src={`/img/anime/${seriesName}/${anime.title.toLowerCase().replace(/\s/g, '-')}/${anime.poster}`}
                    alt={`${anime.title} Poster`}
                    width={100}
                    height={100}
                    loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                  />
                  <div className="flex-1">
                    <p className="text-center md:text-start md:text-2xl">{anime.title}</p>
                    <p className="text-center md:text-start md:text-xl text-subtext font-extrabold">
                      {`Episode ${anime.episodes[0].episode_number} - ${anime.episodes[anime.episodes.length - 1].episode_number}`}
                    </p>
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
