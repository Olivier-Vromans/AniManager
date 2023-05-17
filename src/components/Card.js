'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function Card({ img, title }) {
  const webpImage = `/img/webp/${img}.webp`;
  const pngImage = `/img/png/${img}.png`;
  return (
    <a href={pngImage}>
      <div className="rounded-3xl overflow-hidden">
        <picture>
          {webpImage && <source srcSet={webpImage} type="image/webp" />}
          <source srcSet={pngImage} type="image/png" />
          <img src={pngImage} alt='hero' className="w-36 md:w-44 xl:w-56 2xl:w-80" />
        </picture>
      </div>
      <p className="text-xl md:text-2xl lg:text-3xl">{title}</p>
    </a>
  );
}
