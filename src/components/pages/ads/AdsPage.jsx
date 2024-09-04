import { useSelector } from "react-redux";
import { useGetAdsQuery } from "../../../feature/ads/adsSlice";
import Hero from "../home/Hero";
import AdsCard from "./AdsCard";
import LoadingAnimation from "../../LoadingAnimation";
import { useEffect } from "react";
import EmptyMessage from "../../global/EmptyMessage";
import ErrorComponent from "../../global/ErrorComponent";

const AdsPage = () => {
  const {
    data: ads,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAdsQuery("allAds");

  let allAds;

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(200, 200);
  }, []);

  if (isLoading) {
    allAds = <LoadingAnimation />;
  } else if (isError) {
    if (error.status === "FETCH_ERROR") {
      allAds = <ErrorComponent errMessage="Can't connect to the server" />;
    } else {
      allAds = (
        <ErrorComponent errMessage={error?.data?.error ?? error?.status} />
      );
    }
  } else if (isSuccess) {
    allAds =
      ads.length > 0 ? (
        ads.map((ad) => {
          if (ad?.active) return <AdsCard key={ad?._id} ad={ad} />;
        })
      ) : (
        <EmptyMessage message="No blogs available to show" showBtn={true} />
      );
  }

  return (
    <>
      <Hero />
      <div className="container mx-auto px-6 py-24 flex flex-col gap-10">
        {allAds}
      </div>
    </>
  );
};

export default AdsPage;
