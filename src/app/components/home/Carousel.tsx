'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CarouselItem {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
}

const carouselItems: CarouselItem[] = [
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
    link: `/brand/Yves%20Saint%20Laurent`,
  },
  {
    id: 5,
    title: 'Featured Brand: Maison Margiela Replica',
    imageUrl: '/images/brandfeaturereplica.jpg',
    link: `/brand/Maison%20Martin%20Margiela`,
  },
  {
    id: 6,
    title: 'Creed Aventus',
    imageUrl: '/images/brandfeaturecreed.jpg',
    link: '/brand/Creed',
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Navigation handlers
  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNextSlide, 10000);
    return () => clearInterval(interval);
  }, [isPaused, goToNextSlide]);

  const currentItem = carouselItems[currentIndex];

  return (
    <div
      className="relative h-[40rem] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Image Carousel"
    >
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute h-full w-full transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== currentIndex}
        >
          <Link
            href={currentItem.link}
            className="relative block h-full w-full"
            aria-label={`View ${currentItem.title}`}
            tabIndex={0}
          >
            <Image
              src={currentItem.imageUrl}
              alt={currentItem.title}
              className="object-cover"
              fill
              priority={index === currentIndex}
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-semibold text-white">
                {currentItem.title}
              </h2>
            </div>
          </Link>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        type="button"
        className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
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
        </span>
      </button>

      <button
        type="button"
        className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={goToNextSlide}
        aria-label="Next slide"
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
        </span>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-3 w-3 rounded-full ${
              index === currentIndex
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
