import React from 'react';
import { FaBars, FaSearch, FaUser } from 'react-icons/fa';
import { metadata } from '@/app/layout.js';

export default function Nav() {
    return (
        <nav className='absolute flex flex-row items-center justify-between left-0 right-0 top-6 md:top-16 px-6 md:px-32'>
            <a href='/' className='mx-2 md:mx-3'>
                <h1 className='font-japanese text-xl md:text-2xl ml-auto mr-auto w-full'>{metadata.title}</h1>
            </a>
            <div className='flex flex-row items-center space-x-2 md:space-x-3'>
                <a href='/' className='mx-2 md:mx-3'>
                    <FaSearch color='#808080' size={25} />
                </a>
                <a href='/' className='mx-2 md:mx-3'>
                    <FaUser color='#808080' size={25} />
                </a>
                <a href='/' className='mx-2 md:mx-3'>
                    <FaBars color='#808080' size={25} />
                </a>
            </div>
        </nav>
    );
}
