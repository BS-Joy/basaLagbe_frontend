import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdDetailThumbnail from "./AdDetailThumbnail";
import DetailInfoSection from "./DetailInfoSection";
import AdDetailLocationInfo from "./AdDetailLocationInfo";
import AdDetailFlatInfo from "./AdDetailFlatInfo";
import AdDetailSummary from "./AdDetailSummary";
import { useGetAdsByIdQuery } from "../../../../feature/api/apiSlice";
import LoadingAnimation from "../../../LoadingAnimation";
import ErrorComponent from "../../../global/ErrorComponent";
import { getCurrentUser } from "../../../../feature/user/userSlice";
import BookmarkButton from "./BookmarkButton";
import UseGetBookmarkStatus from "../../../../hooks/useGetBookmarkStatus";
import { BsBookmarkCheck } from "react-icons/bs";
import toast from "react-hot-toast";
import { FcInfo } from "react-icons/fc";

const AdsDetailPage = () => {
  const { id: adId } = useParams();
  // const { ad, isLoading } = useGetAdsQuery("getAds", {
  //   selectFromResult: ({ data, isLoading }) => {
  //     return { ad: data?.entities[adId], isLoading };
  //   },
  // });

  const { data: ad, isLoading, isError, error } = useGetAdsByIdQuery(adId);
  const user = useSelector(getCurrentUser);

  const isBookmarked = UseGetBookmarkStatus(ad, user);

  // of: Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <LoadingAnimation />;

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  if (!ad) {
    return <ErrorComponent errMessage="Ad not found" />;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* mobile bookmark button */}
      {isBookmarked ? (
        <button
          onClick={() =>
            toast(
              <p className="flex gap-2 items-center">
                <FcInfo />
                Ad is already bookmarked
              </p>
            )
          }
          className="fixed bottom-4 right-4 bg-[rgb(60,80,107)] border p-3 rounded-full block md:hidden disabled:cursor-not-allowed"
        >
          <BsBookmarkCheck size={"1.2rem"} color="white" />
        </button>
      ) : (
        <BookmarkButton user={user} adId={ad?._id} isMobileVersion={true} />
      )}
      <div className="flex flex-col rounded text-slate-500">
        {/* ad image section */}
        <AdDetailThumbnail adThumbnail={ad?.thumbnail} adImages={ad?.images} />

        <div className="flex-1 gap-y-4 py-6 sm:px-0">
          {/* ad details informations section */}
          <DetailInfoSection ad={ad} user={user} />

          {/* location informations */}
          <AdDetailLocationInfo ad={ad} />

          {/* flat informations */}
          <AdDetailFlatInfo ad={ad} />

          {/* summary */}
          <AdDetailSummary ad={ad} />
        </div>
      </div>
    </div>
  );
};

export default AdsDetailPage;
