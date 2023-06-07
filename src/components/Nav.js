import React from 'react';
import { FaBars, FaDatabase, FaSearch, FaUser } from 'react-icons/fa';
import AdminIcon from './AdminIcon.js';

export default function Nav({metadata}) {

    return (
        <nav className='absolute z-50 flex flex-row items-center justify-between left-0 right-0 top-6 md:top-10 px-6 md:px-32'>
            <a href='/' className='mx-2 md:mx-3'>
                <h1 className='font-japanese text-xl md:text-2xl ml-auto mr-auto w-full'>{metadata.title}</h1>
            </a>
            <div className='flex flex-row items-center space-x-2 md:space-x-3'>
                {/* TODO Here can go the nav Items */}
                <a href='/' className='mx-2 md:mx-3 object-center flex flex-col items-center'>
                    {/* <FaDatabase color='#808080' size={25} /> */}
                </a>
                <AdminIcon />
                {/* <a href='/' className='mx-2 md:mx-3'>
                    <FaUser color='#808080' size={25} />
                </a>
                <a href='/' className='mx-2 md:mx-3'>
                    <FaBars color='#808080' size={25} />
                </a> */}
            </div>
        </nav>
    );
}
