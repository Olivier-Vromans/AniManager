"use client"
import React, { useEffect, useState } from 'react'
import Card from './Card.js'
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Featured() {
    const [featuredSeries, setFeaturedSeries] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        async function fetchViewingOrders() {
            try {
                const response = await axios.get("/api/featured");
                setFeaturedSeries(response.data);
                setFetching(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchViewingOrders();
    }, []);

    const skeletonSize = {
        height: 0,
        width: 0,
    };

    const calculateSkeletonSize = () => {
        if (window.innerWidth < 640) {
            skeletonSize.height = 233;
            skeletonSize.width = 144;
        } else if (window.innerWidth < 768) {
            skeletonSize.height = 280;
            skeletonSize.width = 176;
        } else if (window.innerWidth < 1280) {
            skeletonSize.height = 250;
            skeletonSize.width = 200;
        } else {
            skeletonSize.height = 500;
            skeletonSize.width = 320;
        }
    };

    // Call the function to calculate the initial skeleton size
    calculateSkeletonSize();

    // Update the skeleton size when the window is resized
    useEffect(() => {
        const handleResize = () => {
            calculateSkeletonSize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div id="featured" className="z-10 flex flex-row items-center justify-between w-full overflow-x-scroll sm:overflow-hidden">
            {fetching ? (
                // Display Skeleton loading state when fetching
                <SkeletonTheme baseColor='#0e0e0e' highlightColor="#000" inline >
                    <Skeleton
                        width={skeletonSize.width}
                        height={skeletonSize.height}
                        className="flex-shrink-0 mx-2 sm:mx-5"
                        count={2}
                    />
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
