"use client"
// anime.js
import Banner from "@/components/Banner.js";
import axios from "axios";
import React, { useEffect, useState } from "react";

async function getAnimeData() {
  try {
    const response = await axios.get(`/api/anime`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default function Anime() {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const data = await getAnimeData();
        setAnime(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAnime();
  }, []);

  return (
    <main>
      <div className="flex flex-col items-center justify-between pt-24">
        <h1 className='text-center text-4xl'>Browse through the library</h1>
      </div>
      {anime && <Banner series={anime} margin="mt-8" />} 
    </main>
  );
}

