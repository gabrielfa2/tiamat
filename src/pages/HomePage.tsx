import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ProductsSection from '../components/ProductsSection';
import CollectionsSection from '../components/CollectionsSection';
import DualBanners from '../components/DualBanners';
import VideoSection from "../components/VideoSection";
import TeamBanner from '../components/TeamBanner';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <div className="hidden md:block">
        <VideoSection />
      </div>
      <ProductsSection />
      <div className="hidden md:block">
        <TeamBanner />
      </div>
      <CollectionsSection />
      <Footer />
    </>
  );
};


export default HomePage;
