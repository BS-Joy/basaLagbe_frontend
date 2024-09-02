import { useGetAdsQuery } from "../../../feature/ads/adsSlice";
import RecentAdsCarousel from "./RecentAdsCarousel";
import LoadingAnimation from "../../LoadingAnimation";
import ErrorComponent from "../../global/ErrorComponent";

const RecentAds = () => {
  const { data: ads, isSuccess, isError, isLoading, error } = useGetAdsQuery();

  let recent;

  if (isLoading) {
    recent = <LoadingAnimation />;
  } else if (isError) {
    recent = (
      <ErrorComponent errMessage={error?.data?.error ?? error?.status} />
    );
  } else if (isSuccess) {
    recent = <RecentAdsCarousel ads={ads} />;
  }
  return (
    <div className="container mx-auto px-6 pb-28">
      <div className="py-28">
        <p className="text-xl pb-2 text-center">Check</p>
        <h1 className="text-4xl font-bold text-center">Recent Ads</h1>
      </div>

      {/* category cards */}
      {recent}
    </div>
  );
};

export default RecentAds;
