import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { metadata } from '@/app/layout.js'

export default function Footer() {
    return (
        <footer className='bg-primary'>
            <div className='container'>
                <div className='flex flex-col md:flex-row justify-between items-center py-8'>
                    <div className='flex flex-col md:flex-row justify-center items-center md:space-y-0 md:space-x-4'>
                        <a href='/' className='font-japanese text-xl md:text-2xl'>{metadata.title}</a>
                    </div>
                    <div>
                        <p className='text-white text-center md:text-left'>© 2023 {metadata.title}. All rights reserved.</p>
                    </div>
                    <div className="flex flex-row md:flex-col justify-center items-center space-x-4 mt-4 md:space-y-0 md:space-x-4">
                        <a href="https://olivier-vromans.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">
                            <BsFillPersonVcardFill className="text-2xl md:text-3xl text-white hover:text-red-500" />
                        </a>
                        <a href="https://www.github.com/olivier-vromans/" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-2xl md:text-3xl text-white hover:text-red-500" />
                        </a>
                        <a href="https://www.linkedin.com/in/olivier-vromans-57908417a/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-2xl md:text-3xl text-white hover:text-red-500" />
                        </a>
                        <a href="https://www.instagram.com/olivier_vromans/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-2xl md:text-3xl text-white hover:text-red-500" />
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    )
}