import { useEffect } from "react";
import Hero from "./Hero";
import PopularCategories from "./PopularCategories";
import RecentAds from "./RecentAds";

const Home = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Hero />
      <PopularCategories />
      <RecentAds />
    </>
  );
};

export default Home;
