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
    allAds = ads.map((ad) => {
      return <AdsCard key={ad?._id} ad={ad} />;
    });
  }

  return (
    <>
      <Hero />
      {/* filter sidebar */}
      {allAds?.length > 0 ? (
        <div className="container mx-auto px-6 flex gap-8 justify-between my-11">
          <div className="border rounded h-min w-72">
            {/* by category */}
            <div>
              <h2 className="py-1 pl-2 border-y bg-neutral-100">Category:</h2>
              <ul className="py-3 pl-2">
                <li className="mb-2 flex gap-2 items-center">
                  <input className="w-4 h-4" type="checkbox" id="family" />
                  <label htmlFor="family">Family</label>
                </li>
                <li className="mb-2 flex gap-2 items-center">
                  <input className="w-4 h-4" type="checkbox" id="family1" />
                  <label htmlFor="family1">Family</label>
                </li>
                <li className="mb-2 flex gap-2 items-center">
                  <input className="w-4 h-4" type="checkbox" id="family2" />
                  <label htmlFor="family2">Family</label>
                </li>
                <li className="mb-2 flex gap-2 items-center">
                  <input className="w-4 h-4" type="checkbox" id="family3" />
                  <label htmlFor="family3">Family</label>
                </li>
                <li className="mb-2 flex gap-2 items-center">
                  <input className="w-4 h-4" type="checkbox" id="family4" />
                  <label htmlFor="family4">Family</label>
                </li>
              </ul>
            </div>
          </div>

          {/* ads list */}
          <div className="flex flex-col gap-10">{allAds}</div>
        </div>
      ) : (
        <div className="py-10">
          <EmptyMessage message="No ads available to show" showBtn={true} />
        </div>
      )}
    </>
  );
};

export default AdsPage;
