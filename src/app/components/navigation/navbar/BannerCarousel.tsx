'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const BannerCarousel = () => {
  const carouselItems = [
    { text: '🚨 Free shipping on all orders over $99! 🚨', link: null },
    { text: '✨ Check out our newest arrivals!', link: '/all' },
    {
      text: '🔥 Sign up for our newsletter for special deals and offers!',
      link: null,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        setIsSliding(false);
      }, 1500);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-yellow-400">
      <div
        className={`duration-1500 flex items-center justify-center text-center text-sm transition-transform ease-in-out ${
          isSliding
            ? '-translate-x-full opacity-0'
            : 'translate-x-0 opacity-100'
        }`}
      >
        {carouselItems[currentIndex].link ? (
          <Link href={carouselItems[currentIndex].link}>
            {carouselItems[currentIndex].text}
          </Link>
        ) : (
          <p>{carouselItems[currentIndex].text}</p>
        )}
      </div>
    </div>
  );
};

export default BannerCarousel;
