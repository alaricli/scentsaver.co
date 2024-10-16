'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = [
    {
      id: 1,
      title: 'Shop Decants',
      imageUrl: '/images/decants.jpg',
      link: '/decant',
    },
    {
      id: 2,
      title: 'Shop Full Bottles',
      imageUrl: '/images/bottles.jpg',
      link: '/bottle',
    },
    {
      id: 3,
      title: 'Newest Arrivals',
      imageUrl: '/images/newarrivals.jpg',
      link: '/all',
    },
    {
      id: 4,
      title: 'Featured Brand: YSL',
      imageUrl: '/images/brandfeatureysl.jpg',
      link: `/all?brand=${encodeURIComponent('Yves Saint Laurent')}`,
    },
    {
      id: 5,
      title: 'Featured Brand: Maison Margiela Replica',
      imageUrl: '/images/brandfeaturereplica.jpg',
      link: `/all?brand=${encodeURIComponent('Maison Martin Margiela')}`,
    },
    {
      id: 6,
      title: 'Creed Aventus',
      imageUrl: '/images/brandfeaturecreed.jpg',
      link: '/all?brand=Creed',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <div className="relative h-[40rem] w-full overflow-hidden">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute h-full w-full transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link href={item.link} className="relative block h-full w-full">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">{item.title}</h2>
            </div>
          </Link>
        </div>
      ))}

      <button
        type="button"
        className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
          )
        }
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
        }
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 9l4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
