"use client"
import React from 'react'
import { useAuth } from '../../context/AuthContext.js';
import { FaUser } from 'react-icons/fa';

export default function AdminIcon() {
    const { currentUser } = useAuth();

    console.log(currentUser);
    return currentUser &&
        <a href='/admin' className='mx-2 md:mx-3 object-center flex flex-col items-center '>
            <FaUser className='text-white hover:text-red-500' size={25} />
        </a>

}
