import { GrNotes } from "react-icons/gr";

const AdDetailSummary = ({ ad }) => {
  return (
    <div className="shadow-md px-4 shadow-slate-200 rounded mt-4">
      <h1 className="text-md font-semibold text-black border-b-2 flex items-center gap-2 p-2">
        <GrNotes />
        Summary
      </h1>

      <div className="flex flex-col md:flex-row justify-between py-4 text-black px-2">
        <p>{ad.description}</p>
      </div>
    </div>
  );
};

export default AdDetailSummary;
