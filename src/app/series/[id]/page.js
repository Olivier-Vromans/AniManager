"use client";
import Banner from "@/components/Banner.js";
import Order from "@/components/Order.js";
import ShowEpisodes from "@/components/ShowEpisodes.js";
import { useIsMobile } from "@/components/isMobile.js";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

async function getData(serieId) {
  try {
    const response = await axios.get(`/api/series/${serieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function AnimeDetail({ params }) {
  const [activeFilter, setActiveFilter] = useState("Release");
  const [series, setSeries] = useState(null);
  const [isFillersVisible, setIsFillersVisible] = useState(true);
  const isMobile = useIsMobile();

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
        setSeries(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSeries();
  }, [params.id]);

  const isOrderTypeAvailable = (orderType) => {
    return series.seriesOrder.some((order) => order.order_type === orderType);
  };

  const seriesName = useMemo(() => series ? series.serie_name.toLowerCase().replace(/\s/g, '-') : '', [series]);

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

  if (!series) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  // Function to filter fillers based on isFillersVisible state
  const filterFillers = (items) => {
    if (isFillersVisible) {
      return items;
    } else {
      return items.filter((item) => !item.anime.episodes.some((episode) => episode.is_filler));
    }
  };

  return (
    <main>
      <div className="container">
        <Banner series={series} margin="mb-12 mt-28" />
        <div className="container flex flex-row mb-24">
          <div id="poster" className="flex-initial flex flex-col">
            <Image
              className="md:mb-4 hidden md:block w-full"
              src={randomPoster}
              alt={`${series.serie_name} Banner`}
              width={250}
              height={350}
            />
            {!isMobile && (
              <>
                <Order
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  isOrderTypeAvailable={isOrderTypeAvailable}
                />
                <div id="filters" className="flex flex-col">
                  <p className="hidden sm:block text-lg font-gilroy text-subtext font-bold">Filter</p>
                  <div className="flex flex-row items-center justify-around w-full mb-4">
                    <button className={`btn mx-2 w-full ${isFillersVisible ? "" : "btn-inactive"}`}
                      onClick={() => setIsFillersVisible(!isFillersVisible)}>
                      ARC
                    </button>
                    <button className={`btn mx-2 w-full ${isFillersVisible ? "btn-inactive" : ""}`}
                      onClick={() => setIsFillersVisible(!isFillersVisible)}>
                      Filler
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div id="order" className="flex-1 md:ml-6">
            <p className="font-japanese text-center text-4xl mb-4 md:mb-8">{series.title} Watch Order</p>
            {isMobile && (
              <>
                <Order
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  isOrderTypeAvailable={isOrderTypeAvailable}
                />
                <div id="filters" className="flex flex-col">
                  <p className="hidden sm:block text-lg font-gilroy text-subtext font-bold">Filter</p>
                  <div className="flex flex-row items-center justify-around w-full mb-4">
                    <button className={`btn mx-2 w-full ${isFillersVisible ? "" : "btn-inactive"}`}
                      onClick={() => setIsFillersVisible(!isFillersVisible)}>
                      ARC
                    </button>
                    <button className={`btn mx-2 w-full ${isFillersVisible ? "btn-inactive" : ""}`}
                      onClick={() => setIsFillersVisible(!isFillersVisible)}>
                      Filler
                    </button>
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col flex-wrap items-center justify-center md:justify-start w-full pb-8">
              {/* Display anime order based on activeFilter */}
              {series.seriesOrder.map((order) => {
                if (order.order_type === activeFilter) {
                  return order.seriesOrderItems.map((serieOrder) => {
                    return (
                      <div key={`${serieOrder.order}-${serieOrder.anime.anime_id}`} className="flex flex-row items-center justify-center w-full mb-4 sm:mb-0 md:m-6">
                        <Image
                          className="w-32 h-32 md:w-1/2 lg:w-1/6 object-contain"
                          src={serieOrder.anime.poster ? `/img/anime/${series.serie_name.toLowerCase().replace(/\s/g, '-')}/${serieOrder.anime.title.toLowerCase().replace(/\s/g, '-')}/${serieOrder.anime.poster}` : `/img/anime/${series.serie_name.toLowerCase().replace(/\s/g, '-')}/${series.poster}`}
                          width={100}
                          height={100}
                          loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                          alt={`${serieOrder.anime.title} Poster`}
                        />
                        <div className="flex-1">
                          <p className="text-center md:text-start md:text-2xl">{serieOrder.anime.title}</p>
                          <ShowEpisodes anime={serieOrder} isFillersVisible={isFillersVisible} />
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
