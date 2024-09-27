import { MdOutlineContactPhone, MdOutlineDateRange } from "react-icons/md";
import BookmarkButton from "./BookmarkButton";
import { BiCategoryAlt } from "react-icons/bi";
import { RiCalendarCheckLine } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsInfoSquare } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import UseGetBookmarkStatus from "../../../../hooks/useGetBookmarkStatus";
import { Link } from "react-router-dom";

const DetailInfoSection = ({ ad, user }) => {
  const isBookmarked = UseGetBookmarkStatus(ad, user);

  return (
    <header className="flex flex-col pb-6 pt-3 gap-3 shadow-md shadow-slate-200">
      {/* header top */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-2 pt-2 pb-3 px-8">
        <div className="flex gap-2 items-center">
          <BsInfoSquare />
          <span className="text-xl font-bold text-black">
            Detail Informations
          </span>
        </div>
        {isBookmarked ? (
          <button className="bg-slate-200 text-slate-700 px-3 py-2 rounded hover:cursor-text hidden md:block">
            Ad is already bookmarked
          </button>
        ) : (
          <BookmarkButton user={user} adId={ad?._id} />
        )}
      </div>
      <hr />

      <div className="px-4 md:px-8">
        {/* title */}
        <div className="border-b-2 flex justify-between h-full gap-4">
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
              <p>{ad.category?.title}</p>
            </div>
          </div>

          {/* contact informations */}
          <div className="pt-2 md:w-1/2 flex flex-col md:items-center gap-2 border-t-2 md:border-none">
            <h1 className="text-sm md:text-md font-bold text-black flex items-center gap-2">
              <MdOutlineContactPhone />
              Contact Informations
            </h1>

            {user?._id ? (
              <div className="flex flex-col gap-2 justify-between text-black">
                <p className="flex items-center gap-1">
                  <MdOutlinePhoneIphone />: &nbsp;
                  {ad.contact.phone}
                </p>
                <p className="flex items-center gap-1">
                  <IoLogoWhatsapp color="green" />: &nbsp;
                  {ad.contact.whatsapp || "Not Available"}
                </p>
              </div>
            ) : (
              <p className="text-black">
                Please{" "}
                <Link to="/login" className="text-blue-500 underline">
                  {" "}
                  Log in
                </Link>{" "}
                to see contact informations
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DetailInfoSection;
