"use client"
// anime.js
import Banner from "@/components/Banner.js";
import formatStringToURL from "@/components/FormatStringToURL.js";
import axios from "axios";
import Image from "next/image.js";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

async function getAnimeData(params) {
  try {
    const response = await axios.get(params ? `/api/anime?${params}` : `/api/anime`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function Anime() {
  const [anime, setAnime] = useState(null);
  const params = useSearchParams().toString()

  useEffect(() => {
    async function fetchAnime() {
      try {
        const data = await getAnimeData(params);
        setAnime(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAnime();
  }, []);

  if (!anime) return <div className="min-h-screen flex justify-center items-center">Loading...</div>

  if (anime.length === 0) {
    return (
      <main>
        <div className="flex flex-col items-center justify-between pt-24">
          <h1 className='text-center text-4xl'>Browse through the library</h1>
        </div>

        {/* <Banner series={anime} margin="my-8" /> */}
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-2xl">No anime found</p>
        </div>
      </main>
    )
  }


  return (
    <main>
      <div className="container">
        <div className="flex flex-col items-center justify-between pt-24">
          <h1 className='text-center text-4xl'>Browse through the library</h1>
        </div>
        <Banner series={anime} margin="my-8" />
        <div className="grid gap-4 justify-items-center grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-1 lg:grid-cols-4 lg:grid-rows-1 xl:grid-cols-5 xl:grid-rows-1 mb-8">
          {anime.map((a) => (
            <a href={`/series/${a.series.serie_id}`} key={a.series.serie_id} className="flex flex-col justify-center items-center w-44 h-64 lg:w-52 lg:h-64 2xl:w-64 2xl:h-96 relative ">
              <Image
                className="opacity-60 rounded-xl object-cover blur-[1.5px]"
                src={`/img/anime/${a.poster !== null ?
                  `${formatStringToURL(a.series.serie_name)}/${formatStringToURL(a.title)}/${a.poster}`
                  :
                  `${formatStringToURL(a.series.serie_name)}/${a.series.poster}`}`
                }
                alt={formatStringToURL(a.title)}
                fill
              />
              <p className="md:text-2xl font-bold text-center font-japanese absolute">{a.title}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

