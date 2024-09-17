import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";

const BookmarkList = ({
  ad,
  index,
  setShowDeleteModal,
  setToDeleteBookmarkeId,
}) => {
  return (
    <tr className="border-b border-slate-200">
      <td className="border-b-2 p-4 dark:border-dark-5">{index + 1}</td>
      <td className="border-b-2 p-4 dark:border-dark-5">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <img
            className="w-20"
            src="https://images.unsplash.com/photo-1725109431834-bed0465b6302?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="thumbnail"
          />
          <div>
            <h2 className="text-xl font-semibold">{ad?.title}</h2>
            <p className="font-thin">{ad?.category?.title}</p>
          </div>
        </div>
      </td>
      <td className="border-b-2 p-4 dark:border-dark-5">{ad?.availableForm}</td>
      <td className="border-b-2 p-4 dark:border-dark-5">{ad?.rent}</td>
      <td className="border-b-2 p-4 dark:border-dark-5">
        <div className="flex flex-col items-start justify-center gap-3">
          <Link
            to={`/ads/${ad?._id}`}
            className="border border-[#33445B] text-[#33445B] hover:bg-[#33445B] hover:text-white px-4 rounded py-1 flex items-center gap-2 transition-colors"
          >
            <MdOutlineRemoveRedEye />
            See Ad
          </Link>
          <button
            onClick={() => {
              setShowDeleteModal(true);
              setToDeleteBookmarkeId(ad?._id);
            }}
            className="flex items-center gap-2 border border-red-400 text-red-600 px-3 py-1 rounded hover:bg-red-100 hover:text-red-700 transition-colors"
          >
            <RiDeleteBinLine />
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookmarkList;
