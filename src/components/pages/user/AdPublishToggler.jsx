import { useState } from "react";
import { useUpdateAdsActiveStatusMutation } from "../../../feature/api/apiSlice";
import toast from "react-hot-toast";
import SmallLoadingAnimation from "../../SmallLoadingAnimation";

const AdPublishToggler = ({ ad }) => {
  const [activeStatus, setActiveStatus] = useState(ad?.active ? true : false);
  const [loading, setLoading] = useState(false);
  const [updateAd] = useUpdateAdsActiveStatusMutation();

  //   of: handler for toggle active status
  const handlePublishStatus = async (e) => {
    const status = e.target.checked;
    setLoading(true);
    try {
      const res = await updateAd({ adId: ad?._id, active: status }).unwrap();

      if (res?._id) {
        setLoading(false);
        setActiveStatus(status);

        if (res?.active) {
          toast.success("Ad is published now.");
        } else toast.success("Ad is hidden now.");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.data.error);
    }
  };

  return (
    <div className="relative flex flex-wrap items-center">
      {loading ? (
        <SmallLoadingAnimation fillColor="fill-emerald-500" />
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
