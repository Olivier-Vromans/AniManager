'use client';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';


export default function Nav() {

    return (
        <nav className='absolute flex flex-row items-center justify-end right-6 md:right-32 top-6 md:top-16'>
            <a href="/" className='mx-2 md:mx-3'>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: "#808080", }} />
            </a>
            <a href="/" className='mx-2 md:mx-3'>
                <FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#808080", }} />
            </a>
            <a href="/" className='mx-2 md:mx-3'>
                <FontAwesomeIcon icon={faBars} size="xl" style={{ color: "#808080", }} />
            </a>
        </nav>
    );
}

