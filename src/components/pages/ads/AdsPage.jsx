import { useSelector } from "react-redux";
import { selectAdsIds, useGetAdsQuery } from "../../../feature/ads/adsSlice";
import Hero from "../home/Hero";
import AdsCard from "./AdsCard";
import LoadingAnimation from "../../LoadingAnimation";
import { useEffect } from "react";

const AdsPage = () => {
  const { isLoading, isSuccess, isError, error } = useGetAdsQuery();
  const adsIds = useSelector(selectAdsIds);

  console.log(adsIds)
  
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError) {
    return <p className="text-red-5000">{error.message}</p>;
  }

  if (isSuccess) {
    return (
      <>
        <Hero />
        <div className="container mx-auto px-6 py-24 flex flex-col gap-10">
          {adsIds.map((adId) => {
            return <AdsCard key={adId} adId={adId} />;
          })}
        </div>
      </>
    );
  }
};

export default AdsPage;
