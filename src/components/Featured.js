"use client"
import React from 'react'
import Card from './Card.js'

export default function Featured() {
    // fetch the featured anime from the database with prisma


    return (
        <div id='featured' className="z-10 flex flex-row items-center justify-between w-full overflow-x-scroll sm:overflow-hidden">
            {/* TODO Change to dynamic feature */}
            <div className="flex-shrink-0 mx-2 sm:mx-5">
                <Card img={"anime/demon-slayer/demon-slayer"} title={"Demon Slayer"} id={1} />
            </div>
            <div className="flex-shrink-0 mx-2 sm:mx-5">
                <Card img={"anime/naruto/naruto"} title={"Naruto"} id={2} />
            </div>
            <div className="flex-shrink-0 mx-2 sm:mx-5">
                <Card img={"anime/code-geass/lelouch-of-the-rebellion/poster"} title={"Code Geass"} id={3} />
            </div>
        </div>

    )
}
