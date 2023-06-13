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
  const [activeFilter, setActiveFilter] = useState("Release");
  const [series, setSeries] = useState(null);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const data = await getData(params.id);
        console.log(data)
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
      let randomBannerIndex = Math.floor(Math.random() * series.animes.length);
      let animeTitle = series.animes[randomBannerIndex].title.toLowerCase().replace(/\s/g, '-');
      let banner = series.animes[randomBannerIndex].banner;

      // Retry with a different random index if the banner is empty
      while (!banner) {
        randomBannerIndex = Math.floor(Math.random() * series.animes.length);
        animeTitle = series.animes[randomBannerIndex].title.toLowerCase().replace(/\s/g, '-');
        banner = series.animes[randomBannerIndex].banner;
      }

      return `/img/anime/${seriesName}/${animeTitle}/${banner}`;
    }

    return '';
  }, [series, seriesName]);


  const randomPoster = useMemo(() => {
    if (series && series.animes.length > 0) {
      let randomPosterIndex = Math.floor(Math.random() * series.animes.length);
      let animeTitle = series.animes[randomPosterIndex].title.toLowerCase().replace(/\s/g, '-');
      let poster = series.animes[randomPosterIndex].poster;

      while (!poster) {
        randomPosterIndex = Math.floor(Math.random() * series.animes.length);
        animeTitle = series.animes[randomPosterIndex].title.toLowerCase().replace(/\s/g, '-');
        poster = series.animes[randomPosterIndex].poster;
      }

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
      setY(Math.min(window.scrollY, 480));
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
            className={`${activeFilter === 'Release' ? 'btn' : 'btn-inactive'} py-2 px-4 rounded-sm`}
            onClick={() => setActiveFilter('Release')}
          >
            Release
          </button>
          <button
            className={`${activeFilter === 'Chronological' ? 'btn' : 'btn-inactive'} py-2 px-4 rounded-sm mx-4`}
            onClick={() => setActiveFilter('Chronological')}
          >
            Chronicle
          </button>
          <button
            className={`${activeFilter === 'Community' ? 'btn' : 'btn-inactive'} py-2 px-4 rounded-sm`}
            onClick={() => setActiveFilter('Community')}
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
            backgroundPositionY: `calc(40% + -${y / 2}px)`,
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
              {/* Display anime order based on activeFilter */}
              {series.seriesOrder.map((order) => {
                console.log(order.order_type);
                console.log(activeFilter);
                console.log(order.seriesOrderItems);
                if (order.order_type === activeFilter) {
                  return order.seriesOrderItems.map((serieOrder) => {
                    console.log(serieOrder.anime);
                    return (
                      <div key={serieOrder.anime.anime_id} className="flex flex-row items-center justify-center w-full mb-4 sm:mb-0 md:m-6">
                        <Image
                          className="w-32 h-32 md:w-1/2 lg:w-1/6 object-contain"
                          src={serieOrder.anime.poster ? `/img/anime/${series.serie_name.toLowerCase().replace(/\s/g, '-')}/${serieOrder.anime.title.toLowerCase().replace(/\s/g, '-')}/${serieOrder.anime.poster}` : `/img/anime/${series.serie_name.toLowerCase().replace(/\s/g, '-')}/${series.poster}`}
                          width={100}
                          height={100}
                          loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                        />
                        <div className="flex-1">
                          <p className="text-center md:text-start md:text-2xl">{serieOrder.anime.title}</p>
                          <p className="text-center md:text-start md:text-xl text-subtext font-extrabold">
                            { serieOrder.fromEpisode !== serieOrder.toEpisode ?
                            `Episode ${serieOrder.fromEpisode} - ${serieOrder.toEpisode}` :
                            `Episode ${serieOrder.fromEpisode}`
                            }
                          </p>
                        </div>
                      </div>
                    );
                  });
                }
              })
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
