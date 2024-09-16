import { BsBuildingUp } from "react-icons/bs";
import { TbBed } from "react-icons/tb";
import { PiBathtub } from "react-icons/pi";
import { FaBuildingWheat } from "react-icons/fa6";

const AdDetailFlatInfo = ({ ad }) => {
  return (
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
  );
};

export default AdDetailFlatInfo;
