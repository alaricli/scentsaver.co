import { type FC } from 'react';
import AboutBanner from './components/home/AboutBanner';
import Carousel from './components/home/Carousel';
import Preview from './components/home/Preview';

const HomePage: FC = () => {
  return (
    <main
      className="min-h-screen w-full bg-gray-100"
      role="main"
      id="main-content"
    >
      <section aria-label="Featured products carousel">
        <Carousel />
      </section>

      <section aria-label="About us">
        <AboutBanner />
      </section>

      <section aria-label="Product preview">
        <Preview />
      </section>
    </main>
  );
};

export default HomePage;
