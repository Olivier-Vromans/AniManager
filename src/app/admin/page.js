"use client"
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const { data: session, status } = useSession({
        required: true,
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [fetching, setFetching] = useState(true);
    const [serie, setSerie] = useState([]);

    async function fetchViewingOrders() {
        try {
            const response = await axios.get("/api/orders");
            setFetching(false);
            setSerie(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }

    useEffect(() => {
        fetchViewingOrders();
    }, [status === "authenticated"]);

    if (status === "loading") {
        return (
            <div className="container mt-20 md:mt-24">
                <h1 className="text-3xl font-semibold font-japanese text-white">Loading</h1>
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                </div>
            </div>
        )
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
                    {/* if fetching and error is null */}
                    {fetching && !error && (
                        <p className="text-white">Loading...</p>
                    )}
                    {error && <p>{error.message}</p>}
                </div>
            </div>
        </div>
    );
}