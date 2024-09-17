import { BsBookmarkPlus } from "react-icons/bs";
import { useAddToBookmarkMutation } from "../../../../feature/api/apiSlice";
import toast from "react-hot-toast";

const BookmarkButton = ({ user, adId, isMobileVersion }) => {
  const [addToBookmark] = useAddToBookmarkMutation();
  // console.log(ad);
  const handleAddToBookmark = () => {
    try {
      const result = addToBookmark({ userId: user?._id, adId }).unwrap();
      toast.promise(result, {
        loading: "Loading...",
        success: "Bookmark added successfully",
      });
    } catch (err) {
      console.log({ err });
      toast.error(err?.data?.error || err.message || "something wen wrong");
    }
  };

  return (
    <button
      onClick={handleAddToBookmark}
      className={`${
        isMobileVersion
          ? "fixed bottom-4 right-4 bg-[rgb(60,80,107)] border p-3 rounded-full block md:hidden"
          : "hidden md:block bg-[#33445B] hover:bg-[rgb(61,82,109)] p-2 rounded"
      }`}
    >
      <BsBookmarkPlus size={"1rem"} color="white" />
    </button>
  );
};

export default BookmarkButton;
