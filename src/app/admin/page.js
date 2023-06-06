"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaImage, FaPhotoVideo } from 'react-icons/fa';
import Modal from 'react-modal';
import { PrismaClient } from '@prisma/client';

export default function AdminPage() {
    const [fetching, setFetching] = useState(true);
    const [seriesName, setSeriesName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [isDubbed, setIsDubbed] = useState(false);
    const [optional, setOptional] = useState(false);
    const [poster, setPoster] = useState('');
    const [banner, setBanner] = useState('');
    const [type, setType] = useState('');
    const [episodes, setEpisodes] = useState([]);
    const [episodeNumber, setEpisodeNumber] = useState('');
    const [isFiller, setIsFiller] = useState(false);
    const [serie, setSerie] = useState([]);
    const [selectedViewingOrder, setSelectedViewingOrder] = useState('');
    const [episodeSequence, setEpisodeSequence] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        // Fetch existing viewing orders
        fetchViewingOrders();
    }, []);

    async function fetchViewingOrders() {
        try {
            const response = await axios.get('/api/orders');
            setFetching(false);
            setSerie(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function createSeries() {
        try {
            const response = await axios.post('/api/series', { seriesName });
            const seriesId = response.data.seriesId;
            await createAnime(seriesId);
        } catch (error) {
            console.log(error);
        }
    }

    async function createAnime(seriesId) {
        try {
            const response = await axios.post('/api/anime', {
                seriesId,
                title,
                description,
                releaseDate,
                isDubbed,
                optional,
                poster,
                banner,
                type,
            });
            const animeId = response.data.animeId;
            await createViewingOrder(animeId);
        } catch (error) {
            console.log(error);
        }
    }

    async function createViewingOrder(animeId) {
        try {
            const response = await axios.post('/api/viewing-orders', {
                orderType: selectedViewingOrder,
                animeId,
                episodes,
                episodeSequence,
            });
            console.log(response.data);
            // Reset form values
            setSeriesName('');
            setTitle('');
            setDescription('');
            setReleaseDate('');
            setIsDubbed(false);
            setOptional(false);
            setPoster('');
            setBanner('');
            setType('');
            setEpisodes([]);
            setEpisodeNumber('');
            setIsFiller(false);
            setSelectedViewingOrder('');
            setEpisodeSequence('');
            // Fetch updated viewing orders
            fetchViewingOrders();
        } catch (error) {
            console.log(error);
        }
    }

    function addEpisode() {
        if (episodeNumber && episodeSequence) {
            setEpisodes((prevEpisodes) => [
                ...prevEpisodes,
                {
                    episodeNumber,
                    isFiller,
                },
            ]);
            setEpisodeNumber('');
            setIsFiller(false);
        }
    }

    return (
        <div className="container mt-20 md:mt-24">
            <h1 className="text-3xl font-semibold font-japanese text-white">Admin Page</h1>
            {/* Create New Series */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Create New Series</h2>
                <div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-6">
                            Serie Name:
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                                type="text"
                                name="serie"
                                id="seriesName"
                                className="block w-2/4 rounded-md border-0 py-1.5 pl-7 pr-7 bg-transparent
                            ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-btn 
                            text-white  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                placeholder="Naruto"
                            />
                        </div>
                    </div>
                    <button
                        onClick={createSeries}
                        className="btn mt-4"
                    >
                        Create Series
                    </button>
                </div>
            </div>

            {/* list all database orders */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Viewing Orders</h2>
                <div className="flex flex-col">
                    {!fetching && (
                        <table className="border-collapse w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 bg-gray-800 text-white">Series Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serie.map((s) => (
                                    <tr key={s.series_id}>
                                        <td className="px-4 py-2 border-t">{s.serie_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>

    )
}
