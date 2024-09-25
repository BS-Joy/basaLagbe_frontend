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
import { FaArrowRotateLeft } from "react-icons/fa6";
import AdsPagination from "./AdsPagination";

const AdsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetInputFields, setResetInputFields] = useState(false);
  const [totalAds, setTotalAds] = useState(0);

  const divFormParams = searchParams?.get("div");
  const distFormParams = searchParams?.get("dist");
  const areaFormParams = searchParams?.get("area");
  const categoryFormParams = searchParams?.get("cat");
  const pageParams = searchParams?.get("page");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFormParams || ""
  );

  const [currentPage, setCurrentPage] = useState(pageParams || 1);

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
    cat: selectedCategory || null,
    queryParams: paramsAvailable ? allSearchParams : null,
    currentPage,
  });

  const dispatch = useDispatch();

  const ads = useSelector(getAdsSelector);

  let allAds;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAds(data?.data));
      setTotalAds(data?.total);
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

  const resetSearch = () => {
    setSearchParams("");
    setResetInputFields(true);
    dispatch(setAds(data));
    setCurrentPage(1);
  };

  if (isLoading) {
    allAds = <LoadingAnimation />;
  } else if (isError) {
    allAds = <ErrorComponent error={error} />;
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

  const adsPerPage = 5; // Example: 5 ads per page
  const startCount = (currentPage - 1) * adsPerPage + 1; // Starting index of ads on current page
  const endCount = Math.min(currentPage * adsPerPage, totalAds);
  let totalResults;

  if (totalAds < 1) {
    totalResults = "Showing 0 Ads";
  } else if (startCount === endCount) {
    totalResults = `Showing ${startCount} of ${totalAds} Ads`;
  } else {
    totalResults = `Showing ${startCount} to ${endCount} of ${totalAds} Ads`;
  }

  return (
    <>
      <Hero
        isAdsPage={true}
        divFormParams={divFormParams}
        distFormParams={distFormParams}
        areaFormParams={areaFormParams}
        resetInputFields={resetInputFields}
      />
      {/* filter sidebar */}
      <div
        className={`container mx-auto px-6 my-11 flex flex-col lg:flex-row ${
          ads?.length > 0 ? "gap-8 justify-between" : "gap-10"
        }`}
      >
        {/* filter */}
        <AdsFilter
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          setCurrentPage={setCurrentPage}
        />

        {/* ads list */}

        <div className="w-full">
          {/* total result and sort */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-[rgb(100,116,139)]">{totalResults}</p>
            <div className="flex items-center gap-4">
              {paramsAvailable && (
                <button
                  onClick={resetSearch}
                  className="border py-2 px-4 rounded flex gap-2 items-center shadow-md bg-[#33445B] text-white hover:border-[#33445B] hover:bg-white hover:text-[#33445B] transition-all"
                >
                  <FaArrowRotateLeft />
                  <span>Reset Search</span>
                </button>
              )}

              {/* ads filter */}
              {ads?.length > 0 && (
                <div className="border rounded relative">
                  <select
                    name="sort"
                    id="sort"
                    className="py-2 px-6 md:px-10 transition-all focus:outline-none bg-transparent w-full appearance-none"
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
          </div>

          {/* all ads */}
          <div className="flex flex-col gap-10">{allAds}</div>
          <div className="flex justify-center my-6">
            {ads?.length > 0 && (
              <AdsPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalAds={totalAds}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdsPage;
