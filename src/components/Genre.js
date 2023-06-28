"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

async function getAnimeData() {
    try {
        const response = await axios.get(`/api/genre`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default function Genre() {
    const [genres, setGenres] = useState(null);
    const [shownGenres, setShownGenres] = useState(null);

    useEffect(() => {
        async function fetchAnime() {
            try {
                const data = await getAnimeData();
                setGenres(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAnime();
    }, []);

    useEffect(() => {
        const calculateGridContent = () => {
            const windowWidth = window.innerWidth;
            let maxContent = 4; // 2 columns for small screens
            if (windowWidth >= 1280) maxContent = 5; // 5 columns for xl screens
            else if (windowWidth >= 1024) maxContent = 4; // 4 columns for large screens
            else if (windowWidth >= 768) maxContent = 3; // 3 columns for medium screens
            setShownGenres(genres !== null ? genres.slice(0, maxContent) : null);
        };

        calculateGridContent();

        const handleResize = () => {
            calculateGridContent();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [genres]);

    if (!shownGenres) {
        return null; // Return null or a loading spinner while genres are being fetched
    }

    return (
        <div className="container my-16">
            <div id="genres" className='flex flex-col '>
                <div className='flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between w-full pb-8'>
                    <h2 className="text-2xl md:text-3xl font-bold text-center lg:text-left font-japanese ">Popular Genres</h2>
                    {/* <a href='/genre' className='btn-secondary mt-4 md:mt-0'>
                        More Genres
                    </a> */}
                </div>
                <div className="grid gap-4 justify-items-center grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-1 lg:grid-cols-4 lg:grid-rows-1 xl:grid-cols-5 xl:grid-rows-1">
                    {shownGenres.map((genre) => (
                        <a href={`/anime?genre=${genre.genre_id}`} key={genre.genre_id} className="flex flex-col justify-center items-center w-44 h-64 lg:w-52 lg:h-64 2xl:w-64 2xl:h-96 relative">
                            <Image
                                className="opacity-60 rounded-xl object-cover"
                                src={`/img/genre/${genre.genre_name.toLowerCase()}.webp`}
                                alt={genre.genre_name}
                                fill
                            />
                            <p className="md:text-2xl font-bold text-center font-japanese absolute">{genre.genre_name}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
