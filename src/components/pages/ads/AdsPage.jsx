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
import { getAdsSelector, setAds, sortAds } from "../../../feature/ads/adsSlice";
import { useSearchParams } from "react-router-dom";

const AdsPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const divFormParams = searchParams?.get("div");
  const distFormParams = searchParams?.get("dist");
  const areaFormParams = searchParams?.get("area");

  let paramsAvailable = false;
  const allSearchParams = {
    division: "",
    district: "",
    area: "",
  };

  if (divFormParams && distFormParams && areaFormParams) {
    paramsAvailable = true;
    allSearchParams.division = divFormParams;
    allSearchParams.district = distFormParams;
    allSearchParams.area = areaFormParams;
  }

  const { data, isLoading, isSuccess, isError, error } = useGetAdsQuery({
    cat: selectedCategoryId || null,
    queryParams: paramsAvailable ? allSearchParams : null,
  });

  const dispatch = useDispatch();

  const ads = useSelector(getAdsSelector);

  let allAds;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAds(data));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(200, 200);
  }, []);

  const handleSorting = (e) => {
    const sortType = e.target.value;
    dispatch(sortAds({ ads, sortType, originalState: data }));
  };

  if (isLoading) {
    allAds = <LoadingAnimation />;
  } else if (isError) {
    if (error.status === "FETCH_ERROR" || error.status === 500) {
      allAds = (
        <ErrorComponent
          errMessage={
            error?.status === 500
              ? error.data.error
              : "Can't connect to the server"
          }
          serverError={true}
        />
      );
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
