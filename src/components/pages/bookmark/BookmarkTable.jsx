import BookmarkList from "./BookmarkList";
import emptyStatusImage from "../../../assets/Empty.svg";

const BookmarkTable = ({ ads, setShowDeleteModal, setToDeleteBookmarkeId }) => {
  return (
    <>
      {ads?.length > 0 ? (
        <table
          className="w-full text-left border-collapse rounded w-overflow-x-auto "
          cellSpacing="0"
        >
          <thead>
            <tr className="border-b border-slate-300">
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 "
              >
                #
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 "
              >
                Ads
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 "
              >
                Available Form
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 "
              >
                Rent
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 "
              >
                Actions
              </th>
            </tr>
          </thead>
          {/* bookmark list */}
          <tbody>
            {ads?.map((ad, index) => (
              <BookmarkList
                key={ad?._id}
                ad={ad}
                index={index}
                setShowDeleteModal={setShowDeleteModal}
                setToDeleteBookmarkeId={setToDeleteBookmarkeId}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full flex flex-col items-center gap-6 text-center my-10">
          <img
            className="w-1/2 bg-slate-200 p-8 rounded-full sm:w-1/4"
            src={emptyStatusImage}
            alt="empty"
          />
          <h1 className="uppercase font-semibold text-xl tracking-widest text-gray-500">
            You have no bookmarked ads
          </h1>
        </div>
      )}
    </>
  );
};

export default BookmarkTable;
