/* eslint-disable react/prop-types */
import { IoLocationOutline } from "react-icons/io5";
import { TbBed } from "react-icons/tb";
import { PiBathtub } from "react-icons/pi";
import { Link } from "react-router-dom";

const defaultImageUrl =
  "https://res.cloudinary.com/di1qocbyt/image/upload/v1727499375/basaLagbe/d7ofx4ej9pxio7xifipd.webp";

export default function AdsCard({ ad }) {
  return (
    <>
      {/*<!-- Component: Horizontal card--> */}
      <div className="flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 sm:flex-row border">
        {/*  <!-- Image --> */}
        <figure className="flex-1 p-2">
          <img
            src={ad?.thumbnail ? ad?.thumbnail?.url : defaultImageUrl}
            alt="card image"
            className="object-fill min-h-full aspect-auto rounded border"
          />
        </figure>
        {/*  <!-- Body--> */}
        <div className="flex-1 p-6 sm:mx-6 sm:px-0">
          <header className="flex justify-center h-full flex-col gap-4 mb-4">
            <h2 className="text-2xl font-medium text-slate-700">{ad.title}</h2>
            <p className="text-sm text-green-700">
              {" "}
              Posted on: {new Date(ad?.createdAt).toDateString()}
            </p>
            <p className="text-sm text-violet-600">
              {" "}
              Category: {ad.category?.title}
            </p>

            {/* location */}
            <p className="text-lg flex items-center">
              {" "}
              <span className="bg-[rgb(51,68,91)] p-1 rounded-full">
                <IoLocationOutline size="18px" color="white" />
              </span>
              &nbsp;: {ad?.location?.area}, {ad?.location?.district}
            </p>

            {/* rent */}
            <p className="text-lg flex items-center">
              <span className="bg-[rgb(51,68,91)] px-2 rounded-full text-white">
                ৳
              </span>
              &nbsp;: {ad?.rent}/month
            </p>

            {/* bed room */}
            <p className="text-lg flex items-center">
              {" "}
              <span className="bg-[rgb(51,68,91)] p-1 rounded-full">
                <TbBed size="18px" color="white" />
              </span>
              &nbsp;Bedrooms : {ad?.bedroom}
            </p>

            {/* bathroom */}
            <p className="text-lg flex items-center">
              <span className="bg-[rgb(51,68,91)] p-1 rounded-full text-white">
                <PiBathtub size="18px" color="white" />
              </span>
              &nbsp;Bathrooms: {ad?.bathroom}
            </p>
            <hr />
            <Link
              to={`/ads/${ad?._id}`}
              className="py-2 rounded bg-[rgb(51,68,91)] hover:bg-[rgb(61,82,109)] text-white text-center"
            >
              See Details
            </Link>
          </header>
        </div>
      </div>
      {/*<!-- End Horizontal card--> */}
    </>
  );
}
