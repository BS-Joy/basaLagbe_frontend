import { useSelector } from "react-redux";
import { useGetAdsQuery } from "../../../feature/ads/adsSlice";
import Hero from "../home/Hero";
import AdsCard from "./AdsCard";
import LoadingAnimation from "../../LoadingAnimation";
import { useEffect } from "react";
import EmptyMessage from "../../global/EmptyMessage";

const AdsPage = () => {
  const {
    data: ads,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAdsQuery("allAds");

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(200, 200);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError) {
    console.log("error...");
    return <p className="text-red-5000">{error.message}</p>;
  }

  if (isSuccess) {
    return (
      <>
        <Hero />
        <div className="container mx-auto px-6 py-24 flex flex-col gap-10">
          {ads.length > 0 ? (
            ads.map((ad) => {
              return <AdsCard key={ad?._id} ad={ad} />;
            })
          ) : (
            <EmptyMessage message="No blogs available to show" />
          )}
        </div>
      </>
    );
  }
};

export default AdsPage;
