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
      <ProductsSection />
      <VideoSection />
      <TeamBanner />
      <CollectionsSection />
      <Footer/>
    </>
  );
};

export default HomePage;