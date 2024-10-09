'use client';

import { useEffect, useState } from 'react';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = [
    { id: 1, content: 'Card 1' },
    { id: 2, content: 'Card 2' },
    { id: 3, content: 'Card 3' },
    { id: 4, content: 'Card 4' },
    { id: 5, content: 'Card 5' },
    { id: 6, content: 'Card 6' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative h-96 w-full">
        {/* Carousel */}
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute h-full w-full transition-transform duration-500 ${
              index === currentIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex h-full items-center justify-center bg-gray-200 text-xl font-bold">
              {item.content}
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded bg-gray-700 p-2 text-white"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
            )
          }
        >
          Prev
        </button>

        {/* Next Button */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded bg-gray-700 p-2 text-white"
          onClick={() =>
            setCurrentIndex(
              (prevIndex) => (prevIndex + 1) % carouselItems.length
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
