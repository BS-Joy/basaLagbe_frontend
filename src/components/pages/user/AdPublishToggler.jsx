import { useState } from "react";
import { useUpdateAdMutation } from "../../../feature/ads/adsSlice";
import toast from "react-hot-toast";
import LoadingAnimation from "../../LoadingAnimation";

const AdPublishToggler = ({ ad }) => {
  const [activeStatus, setActiveStatus] = useState(ad?.active ?? true);
  const [loading, setLoading] = useState(false);
  const [updateAd] = useUpdateAdMutation();

  //   of: handler for toggle active status
  const handlePublishStatus = async (e) => {
    const status = e.target.checked;
    setLoading(true);
    try {
      const res = await updateAd({ _id: ad?._id, active: status }).unwrap();
      if (res?._id) {
        setLoading(false);
        setActiveStatus(status);
        console.log(res?.active);
        if (res?.active) {
          toast.success("Ad is published now.");
        } else toast.success("Ad is hidden now.");
      }
    } catch (err) {
      setLoading(false);
      toast.err(err);
    }
  };

  return (
    <div className="relative flex flex-wrap items-center">
      {loading ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-live="polite"
          aria-busy="true"
        >
          <path
            d="M7 10H3V14H7V10Z"
            className="animate animate-bounce fill-emerald-500 "
          />
          <path
            d="M14 10H10V14H14V10Z"
            className="animate animate-bounce fill-emerald-500 [animation-delay:.2s]"
          />
          <path
            d="M21 10H17V14H21V10Z"
            className="animate animate-bounce fill-emerald-500 [animation-delay:.4s]"
          />
        </svg>
      ) : (
        <input
          className="peer relative h-4 w-8 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-emerald-200 checked:after:left-4 checked:after:bg-emerald-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-emerald-300 checked:after:hover:bg-emerald-600 focus:outline-none checked:focus:bg-emerald-400 checked:after:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
          onChange={handlePublishStatus}
          checked={activeStatus}
          type="checkbox"
          id="id-c01"
        />
      )}
    </div>
  );
};

export default AdPublishToggler;
