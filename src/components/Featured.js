import React, { useEffect, useState } from 'react'
import Card from './Card.js'
import axios from 'axios';

export default function Featured() {
    const [featuredSeries, setFeaturedSeries] = useState(null)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        async function fetchViewingOrders() {
            try {
                const response = await axios.get("/api/featured");
                setFeaturedSeries(response.data);
                setFetching(false);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchViewingOrders();
    }, []);

    if (fetching) {
        return <div id='featured' className="z-10 flex flex-row items-center justify-between w-full overflow-x-scroll sm:overflow-hidden">
            Loading...
        </div>;
    }

    return (
        <div id='featured' className="z-10 flex flex-row items-center justify-between w-full overflow-x-scroll sm:overflow-hidden">
            {featuredSeries.map((serie) => (
                <a href={`series/${serie.serie_id}`} key={serie.serie_id} className="flex-shrink-0 mx-2 sm:mx-5">
                    <Card img={serie.poster ? serie.poster : serie.animes[0].poster} title={serie.serie_name} id={serie.serie_id} />
                </a>
            ))}
        </div>
    )
}
