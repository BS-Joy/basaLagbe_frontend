import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../feature/user/userSlice";
import { useGetAdsByAuthorQuery } from "../../../feature/ads/adsSlice";
import AdsByAuthorList from "./AdsByAuthorList";
import LoadingAnimation from "../../LoadingAnimation";
import { useState } from "react";
import ErrorComponent from "../../global/ErrorComponent";
import AdsUpdateModal from "./AdsUpdateModal";
import AdDeleteConfirmationModal from "./AdDeleteConfirmationModal";
import EmptyMessage from "../../global/EmptyMessage";

const AdsByAuthorTable = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});
  const [toDeleteAdId, setToDeleteAdId] = useState();
  const user = useSelector(getCurrentUser);
  const authorId = user?._id;

  const {
    data: ads,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetAdsByAuthorQuery(authorId);

  let adsByAuthor;

  if (isLoading) {
    return <LoadingAnimation />;
  }
  if (isError) {
    return <ErrorComponent errMessage={error?.data?.error ?? error?.status} />;
  } else if (isSuccess) {
    adsByAuthor = (
      <AdsByAuthorList
        ads={ads}
        setIsShowing={setIsShowing}
        setSelectedAd={setSelectedAd}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        setToDeleteAdId={setToDeleteAdId}
      />
    );
  }
  return (
    <>
      {ads?.length > 0 ? (
        <table className="w-full caption-bottom text-sm">
          {/* table header */}
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              {/* <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Ads ID
            </th> */}
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Title
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Rent/Month
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Available Form
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Actions
              </th>
            </tr>
          </thead>

          {/* table body */}
          {adsByAuthor}
        </table>
      ) : (
        <EmptyMessage message="No Ads Posted Yet" showBtn={true} />
      )}

      <AdsUpdateModal
        isShowing={isShowing}
        setIsShowing={setIsShowing}
        selectedAd={selectedAd}
        setSelectedAd={setSelectedAd}
      />
      <AdDeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        toDeleteAdId={toDeleteAdId}
      />
    </>
  );
};

export default AdsByAuthorTable;
