import AboutBanner from './components/home/AboutBanner';
import Carousel from './components/home/Carousel';
import Preview from './components/home/Preview';

const HomePage = () => {
  return (
    <>
      <div className="w-full p-4">
        <Carousel />
        <AboutBanner />
        <Preview />
      </div>
    </>
  );
};

export default HomePage;
