import { useGetAdsQuery } from "../../../feature/api/apiSlice";
import Hero from "../home/Hero";
import AdsCard from "./AdsCard";
import LoadingAnimation from "../../LoadingAnimation";
import { useEffect, useState } from "react";
import EmptyMessage from "../../global/EmptyMessage";
import ErrorComponent from "../../global/ErrorComponent";
import AdsFilter from "./AdsFilter";
import { CgChevronDown } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { adsSelector, getAds } from "../../../feature/ads/adsSlice";

const AdsPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { data, isLoading, isSuccess, isError, error } = useGetAdsQuery(
    selectedCategoryId || null
  );
  // const [ads, setAds] = useState([]);

  const dispatch = useDispatch();

  const ads = useSelector(adsSelector);

  let allAds;

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      // setAds([...data]);
      dispatch(getAds(data));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(200, 200);
  }, []);

  const handleSorting = (e) => {
    const sortType = e.target.value;
    let sortedAds = [...ads];
    switch (sortType) {
      case "name":
        sortedAds = sortedAds.sort((a, b) => a.title.localeCompare(b.title));
        dispatch(getAds(sortedAds));
        break;
      case "rent":
        sortedAds = sortedAds.sort((a, b) => Number(a.rent) - Number(b.rent));
        dispatch(getAds(sortedAds));
        break;
      case "date-posted":
        sortedAds = sortedAds.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        dispatch(getAds(sortedAds));
        break;
      default:
        dispatch(getAds(data)); // No sorting, default order
        break;
    }
  };

  if (isLoading) {
    allAds = <LoadingAnimation />;
  } else if (isError) {
    console.log(error);
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
        <EmptyMessage message="No ads found" showBtn={true} />
      );
  }

  return (
    <>
      <Hero isAdsPage={true} />
      {/* filter sidebar */}
      <div
        className={`container mx-auto px-6 my-11 flex ${
          ads?.length > 0 ? "gap-8 justify-between" : "gap-10"
        }`}
      >
        {/* filter */}
        <AdsFilter
          setSelectedCategoryId={setSelectedCategoryId}
          selectedCategoryId={selectedCategoryId}
        />

        {/* ads list */}

        <div className="w-full">
          {/* total result and sort */}
          <div className="flex justify-between mb-6">
            <p className="text-[rgb(100,116,139)]">Showing 12 of 15 Ads</p>
            {ads?.length > 0 && (
              <div className="border rounded relative">
                <select
                  name="sort"
                  id="sort"
                  className="py-2 px-14 transition-all focus:outline-none bg-transparent w-full appearance-none"
                  onChange={handleSorting}
                >
                  <option defaultValue="Sort Ads">Sort Ads</option>
                  <option value="name">Name</option>
                  <option value="rent">Rent</option>
                  <option value="date-posted">Date Posted</option>
                </select>
                <CgChevronDown className="absolute top-2.5 right-2" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-10">{allAds}</div>
        </div>
      </div>
    </>
  );
};

export default AdsPage;
