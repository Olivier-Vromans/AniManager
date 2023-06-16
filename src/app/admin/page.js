"use client"
import { useSession } from "next-auth/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SeriesForm from "@/components/admin/SerieForm.js";

export default function AdminPage() {
    const { data: session, status } = useSession({
        required: true,
    });
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [serie, setSerie] = useState([]);
    const [collapsedRows, setCollapsedRows] = useState([]);

    const [serieData, setSerieData] = useState({
        serie_name: null,
        is_featured: false,
        poster: null,
        // seriesOrder: [
        //     {
        //         order_type: "Release",
        //         seriesOrderItems: [
        //             {
        //                 order: null,
        //                 fromEpisode: null,
        //                 toEpisode: null,
        //                 anime: {
        //                     title: null,
        //                     description: 'No description available yet. Check back later!',
        //                     release_date: null,
        //                     is_dubbed: null,
        //                     optional: null,
        //                     poster: null,
        //                     banner: null,
        //                     type: null,
        //                     genres: [

        //                     ],
        //                     episodes: [
        //                         {
        //                             episode_number: null,
        //                             is_filler: null
        //                         },
        //                     ],
        //                 },
        //             },
        //         ],
        //     },
        // ],
    });

    useEffect(() => {
        if (status === "authenticated" && session.user.role !== "ADMIN") {
            window.location.href = "/";
        } else if (status === "authenticated" && session.user.role === "ADMIN") {
            fetchViewingOrders();
        }
    }, [status, session]);

    if (status === "loading" || !session) {
        return (
            <div className="container mt-20 md:mt-24">
                <h1 className="text-3xl font-semibold font-japanese text-white">Loading</h1>
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                </div>
            </div>
        )
    }

    async function fetchViewingOrders() {
        try {
            const res = await axios.get("/api/orders");
            setFetching(false)
            setSerie(res.data);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }

    if (fetching) {
        return (
            <div className="container mt-20 md:mt-24">
                <h1 className="text-3xl font-semibold font-japanese text-white">Loading</h1>
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                </div>
            </div>
        )
    }

    const handleRowToggle = (seriesId) => {
        if (collapsedRows.includes(seriesId)) {
            setCollapsedRows(collapsedRows.filter((id) => id !== seriesId));
        } else {
            setCollapsedRows([...collapsedRows, seriesId]);
        }
    };

    return (
        <div className="container mt-20 md:mt-24">
            <h1 className="text-3xl font-semibold font-japanese text-white">Admin Page</h1>
            {/* Create New Series */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Create New Series</h2>
                <div className="flex flex-col">
                    <SeriesForm serieData={serieData} setSerieData={setSerieData} />
                </div>
            </div>
        </div>
    );
}