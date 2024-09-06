import { useGetAdsQuery } from "../../../feature/ads/adsSlice";
import Hero from "../home/Hero";
import AdsCard from "./AdsCard";
import LoadingAnimation from "../../LoadingAnimation";
import { useEffect } from "react";
import EmptyMessage from "../../global/EmptyMessage";
import ErrorComponent from "../../global/ErrorComponent";
import AdsFilter from "./AdsFilter";

const AdsPage = () => {
  const { data: ads, isLoading, isSuccess, isError, error } = useGetAdsQuery();

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
      ads?.length > 0 ? (
        ads.map((ad) => {
          return <AdsCard key={ad?._id} ad={ad} />;
        })
      ) : (
        <EmptyMessage message="No ads available to show" showBtn={true} />
      );
  }

  return (
    <>
      <Hero />
      {/* filter sidebar */}
      <div
        className={`container mx-auto px-6 my-11 ${
          ads?.length > 0 && "flex gap-8 justify-between"
        }`}
      >
        {/* filter */}
        {ads?.length > 0 && <AdsFilter />}

        {/* ads list */}
        <div className="flex flex-col gap-10">{allAds}</div>
      </div>
    </>
  );
};

export default AdsPage;
