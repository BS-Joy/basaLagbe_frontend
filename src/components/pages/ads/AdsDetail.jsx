import { useParams } from "react-router-dom";
import { useGetAdsQuery } from "../../../feature/ads/adsSlice";
import LoadingAnimation from "../../LoadingAnimation";
import { BsBuildingUp } from "react-icons/bs";
import { TbBed } from "react-icons/tb";
import { PiBathtub } from "react-icons/pi";
import { BsInfoSquare } from "react-icons/bs";
import { BsBookmarkPlus } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { RiCalendarCheckLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBuildingWheat } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { MdOutlineContactPhone } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { useEffect } from "react";

const AdsDetail = () => {
  const { id: adId } = useParams();
  const { ad, isLoading } = useGetAdsQuery("getAds", {
    selectFromResult: ({ data, isLoading }) => {
      return { ad: data?.entities[adId], isLoading };
    },
  });

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <LoadingAnimation />;

  if (!ad) {
    return <p>No ads found</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <button className="fixed bottom-4 right-4 bg-[rgb(60,80,107)] p-4 rounded-full block md:hidden">
        <BsBookmarkPlus size={"1rem"} color="white" />
      </button>
      {/*<!-- Component: Horizontal card--> */}
      <div className="flex flex-col rounded text-slate-500">
        {/*  <!-- Image --> */}
        <figure className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="card image"
            className="object-cover min-h-full aspect-auto rounded"
          />
        </figure>

        {/*  <!-- Body--> */}
        <div className="flex-1 gap-y-4 py-6 sm:px-0">
          {/* header */}
          <header className="flex flex-col pb-6 pt-3 gap-3 shadow-md shadow-slate-200">
            {/* header top */}
            <div className="flex justify-between items-center gap-2 pt-2 pb-3 px-8">
              <div className="flex gap-2 items-center">
                <BsInfoSquare />
                <span className="text-xl font-bold text-black">
                  Detail Informations
                </span>
              </div>
              <button className="hidden md:block">
                <BsBookmarkPlus size={"1.5rem"} />
              </button>
            </div>
            <hr />

            <div className="px-4 md:px-8">
              {/* title */}
              <div className="border-b-2 pb-2 flex justify-between h-full gap-4">
                <h3 className="text-xl font-medium text-slate-700 py-4">
                  {ad.title}
                </h3>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* date and other informations */}
                <div className="py-2 md:w-1/2 flex gap-2 flex-col md:flex-row justify-between text-sm md:text-base">
                  <div className="flex flex-row gap-4 text-black md:flex-col">
                    <p className="flex items-center gap-1 font-bold">
                      <MdOutlineDateRange /> Posted On:
                    </p>
                    <p>{new Date(ad.createdAt).toDateString()}</p>
                  </div>
                  <div className="flex flex-row gap-4 text-black md:flex-col">
                    <p className="flex items-center gap-1 font-bold">
                      <RiCalendarCheckLine />
                      Available Form:
                    </p>
                    <p>
                      {ad.availableForm || (
                        <span className="text-red-500">Not included</span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-row gap-4 text-black md:flex-col">
                    <p className="flex items-center gap-1 font-bold">
                      <BiCategoryAlt />
                      Category:
                    </p>
                    <p>{ad.category}</p>
                  </div>
                </div>

                {/* contact informations */}
                <div className="pt-2 md:w-1/2 flex flex-col md:items-center gap-2 border-t-2 md:border-none">
                  <h1 className="text-sm md:text-md font-semibold text-black flex items-center gap-2">
                    <MdOutlineContactPhone />
                    Contact Informations
                  </h1>

                  <div className="flex flex-col gap-2 justify-between text-black">
                    <p className="flex items-center gap-1">
                      <MdOutlinePhoneIphone />: &nbsp;
                      {ad.contact.phone}
                    </p>
                    <p className="flex items-center gap-1">
                      <IoLogoWhatsapp color="green" />: &nbsp;
                      {ad.contact.whatsapp}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </header>

          {/* location informations */}
          <div className="shadow-md px-4 shadow-slate-200 rounded mt-4">
            <h1 className="text-md font-semibold text-black border-b-2 flex items-center gap-2 p-2">
              <FaMapLocationDot />
              Location Informations
            </h1>

            {/* location information flex conatainer */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
              {/* location */}
              <div className="pt-2 pb-4 flex gap-2 flex-col md:w-1/2 md:flex-row justify-between">
                <div className="flex flex-row gap-1 text-black md:flex-col">
                  <p className="font-bold">Division :</p>
                  <p>{ad.location.division}</p>
                </div>
                <div className="flex flex-row gap-1 text-black md:flex-col">
                  <p className="font-bold">District :</p>
                  <p>{ad.location.district}</p>
                </div>
                <div className="flex flex-row gap-1 text-black md:flex-col">
                  <p className="font-bold">Area :</p>
                  <p>{ad.location.area}</p>
                </div>
              </div>

              {/* short address */}
              <div className="pb-3 md:w-1/2 flex justify-center flex-col items-center">
                <p className="text-black font-semibold flex items-center gap-1">
                  <IoLocationSharp />
                  Short Address:
                </p>
                <p className="py-3 text-black">{ad.address}</p>
              </div>
            </div>
          </div>

          {/* flat informations */}
          <div className="shadow-md px-4 shadow-slate-200 rounded mt-4">
            <h1 className="text-md font-semibold text-black border-b-2 flex items-center gap-2 p-2">
              <FaBuildingWheat />
              Flat Informations
            </h1>

            <div className="flex flex-col md:flex-row justify-between py-4 text-black px-2">
              <p className="flex items-center gap-2">
                <BsBuildingUp /> Floor: &nbsp;
                {ad.floor}
              </p>
              <p className="flex items-center gap-2">
                <TbBed /> Bedroom: &nbsp;
                {ad.bedroom}
              </p>
              <p className="flex items-center gap-2">
                <PiBathtub /> Bathroom: &nbsp;
                {ad.bathroom}
              </p>
            </div>
          </div>

          {/* summary */}
          <div className="shadow-md px-4 shadow-slate-200 rounded mt-4">
            <h1 className="text-md font-semibold text-black border-b-2 flex items-center gap-2 p-2">
              <GrNotes />
              Summary
            </h1>

            <div className="flex flex-col md:flex-row justify-between py-4 text-black px-2">
              <p>{ad.description}</p>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- End Horizontal card--> */}
    </div>
  );
};

export default AdsDetail;
