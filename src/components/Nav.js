"use client"
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { BsGearFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

export default function Nav({ metadata }) {
    const [user, setUser] = useState(null);
    const { data, status } = useSession();

    useEffect(() => {
        if (data) {
            setUser(data.user);
        }
    }, [data]);

    const handleSignOut = async () => {
        await signOut({
            callbackUrl: '/'
        })
    };

    return (
        <nav className="absolute z-50 flex flex-row items-center justify-between left-0 right-0 top-6 md:top-10 px-6 md:px-32">
            <a href="/" className="mx-2 md:mx-3">
                <h1 className="font-japanese text-xl md:text-2xl ml-auto mr-auto w-full">{metadata.title}</h1>
            </a>
            {status !== 'loading' ? (
                <div className="flex flex-row items-center">
                    {/* TODO Here can go the nav Items */}
                    {status === "authenticated" ? (
                        <>
                            {/* TODO Make a profile page */}
                            {/* <a href="/" className="mx-2 md:mx-3">
                                <FaUser className="text-white hover:text-red-500" size={25} />
                            </a> */}
                            <a href="" className="mx-2 md:mx-3" onClick={handleSignOut}>
                                <FiLogOut className="text-white hover:text-red-500" size={25} />
                            </a>
                        </>
                    ) : (
                        <a href="/auth/signin" className="btn mx-2 md:mx-3 text-sm">
                            Sign In
                        </a>
                    )}
                    {user && user.role === 'ADMIN' && (
                        <a href="/admin" className="mx-2 md:mx-3 object-center flex flex-col items-center ">
                            <BsGearFill className="text-white hover:text-red-500" size={25} />
                        </a>
                    )}
                </div>
            ) : (null)}
        </nav>
    );
}
