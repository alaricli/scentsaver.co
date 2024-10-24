'use client';

import { FC, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface BannerItem {
  text: string;
  link: string | null;
  ariaLabel?: string;
}

const carouselItems: BannerItem[] = [
  {
    text: '🚨 Free shipping on all orders over $99! 🚨',
    link: null,
    ariaLabel: 'Announcement: Free shipping on all orders over 99 dollars',
  },
  {
    text: '✨ Check out our newest arrivals!',
    link: '/all',
    ariaLabel: 'Navigate to view our newest arrivals',
  },
  {
    text: '🔥 Sign up for our newsletter for special deals and offers!',
    link: null,
    ariaLabel: 'Announcement: Sign up for our newsletter for special deals',
  },
];

const BannerCarousel: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
      setIsSliding(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextSlide, 15000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const currentItem = carouselItems[currentIndex];

  return (
    <div
      className="relative overflow-hidden bg-yellow-400"
      role="region"
      aria-label="Announcement banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`duration-1500 flex items-center justify-center p-1 text-center text-sm transition-all ease-in-out ${isSliding ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'} `}
        aria-live="polite"
        aria-atomic="true"
      >
        {currentItem.link ? (
          <Link
            href={currentItem.link}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={currentItem.ariaLabel}
          >
            {currentItem.text}
          </Link>
        ) : (
          <p aria-label={currentItem.ariaLabel}>{currentItem.text}</p>
        )}
      </div>
    </div>
  );
};

export default BannerCarousel;
