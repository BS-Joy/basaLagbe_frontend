import RecentAdsCarousel from "./RecentAdsCarousel";
import LoadingAnimation from "../../LoadingAnimation";
import ErrorComponent from "../../global/ErrorComponent";
import { useGetRecentAdsQuery } from "../../../feature/api/apiSlice";

const RecentAds = () => {
  const {
    data: ads,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRecentAdsQuery();

  let recent;

  if (isLoading) {
    recent = <LoadingAnimation />;
  } else if (isError) {
    console.log(error);
    recent = <ErrorComponent error={error} />;
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
