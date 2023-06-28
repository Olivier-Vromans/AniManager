"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Card from './Card.js'
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Featured() {
    const [featuredSeries, setFeaturedSeries] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [skeletonSize, setSkeletonSize] = useState({ width: 200, height: 250 });

    useEffect(() => {
        async function fetchViewingOrders() {
            try {
                const response = await axios.get("/api/featured");

                // randomize the order of the 3 feautred series
                response.data.sort(() => Math.random() - 0.5);

                setFeaturedSeries(response.data);
                setFetching(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchViewingOrders();
    }, []);

    useLayoutEffect(() => {
        const calculateSkeletonSize = () => {
            const width = typeof window !== 'undefined' ? window.innerWidth : 0;

            if (width <= 640) {
                return { height: 233, width: 144 };
            } else if (width <= 768) {
                return { height: 280, width: 176 };
            } else if (width <= 1280) {
                return { height: 250, width: 200 };
            } else if (width <= 1536) {
                return { height: 300, width: 240 };
            } else {
                return { height: 500, width: 320 }
            }

        };

        const updateSkeletonSize = () => {
            const size = calculateSkeletonSize();
            setSkeletonSize(size);
        };

        updateSkeletonSize();
        window.addEventListener('resize', updateSkeletonSize);
        return () => window.removeEventListener('resize', updateSkeletonSize);
    }, []);


    return (
        <div id="featured" className="z-10 flex flex-row items-center justify-between w-full overflow-x-scroll sm:overflow-hidden">
            {fetching ? (
                // Display Skeleton loading state when fetching
                <SkeletonTheme baseColor='#0e0e0e' highlightColor='#000' inline >
                    <Skeleton count={2} className='mx-2' borderRadius={24} style={{ width: skeletonSize.width, height: skeletonSize.height }} />
                </SkeletonTheme>
            ) : (
                // Render the Card components when data is available
                featuredSeries.map((serie) => (
                    <a href={`series/${serie.serie_id}`} key={serie.serie_id} className="flex-shrink-0 mx-2 sm:mx-5">
                        <Card img={serie.poster ? serie.poster : serie.animes[0].poster} title={serie.serie_name} id={serie.serie_id} />
                    </a>
                ))
            )}
        </div>
    );
}
