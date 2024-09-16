import { FaMapLocationDot } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

const AdDetailLocationInfo = ({ ad }) => {
  return (
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
  );
};

export default AdDetailLocationInfo;
