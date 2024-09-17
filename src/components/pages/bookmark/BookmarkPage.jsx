import React, { useEffect, useState } from "react";
import BookmarkTable from "./BookmarkTable";
import { BsJournalBookmark } from "react-icons/bs";
import { useGetBookmarksByUserQuery } from "../../../feature/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../feature/user/userSlice";
import LoadingAnimation from "../../LoadingAnimation";
import ErrorComponent from "../../global/ErrorComponent";
import { setTotalBookmarkedAds } from "../../../feature/ads/adsSlice";
import BookmarkDeleteConfirmationModal from "./BookmarkDeleteConfirmationModal";

const BookmarkPage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDeleteBookmarkId, setToDeleteBookmarkeId] = useState("");
  const user = useSelector(getCurrentUser);
  const { data, isLoading, isSuccess, isError, error } =
    useGetBookmarksByUserQuery(user?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTotalBookmarkedAds(data?.totalAds));
    }
  }, [isSuccess, data]);

  let bookmarks;

  if (isLoading) {
    bookmarks = <LoadingAnimation />;
  } else if (isError) {
    bookmarks = <ErrorComponent error={error} />;
  } else if (isSuccess) {
    bookmarks = (
      <BookmarkTable
        ads={data?.adIds}
        setShowDeleteModal={setShowDeleteModal}
        setToDeleteBookmarkeId={setToDeleteBookmarkeId}
      />
    );
  }
  return (
    <>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-1 sm:gap-3 py-4 underline">
          <BsJournalBookmark className="text-[1rem] sm:text-[2.2rem]" />
          <h1 className="text-xl sm:text-4xl">
            Bookmarked Ads ({data?.totalAds || 0} Items)
          </h1>
        </div>
        <div className="pb-10 w-full overflow-x-auto">{bookmarks}</div>
      </div>
      <BookmarkDeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        toDeleteBookmarkId={toDeleteBookmarkId}
        userId={user?._id}
      />
    </>
  );
};

export default BookmarkPage;
