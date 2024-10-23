import AboutBanner from './components/home/AboutBanner';
import Carousel from './components/home/Carousel';
import Preview from './components/home/Preview';

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Carousel />
      <AboutBanner />
      <Preview />
    </div>
  );
};

export default HomePage;
