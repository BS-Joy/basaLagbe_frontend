import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../feature/user/userSlice";
import { FaCircleUser } from "react-icons/fa6";
import { useGetAdsByAuthorQuery } from "../../../feature/ads/adsSlice";
import AdsByAuthorList from "./AdsByAuthorList";
import LoadingAnimation from "../../LoadingAnimation";

const Profile = () => {
  const user = useSelector(getCurrentUser);
  const authorId = user?._id;

  const {
    data: ads,
    isSuccess,
    isError,
    isLoading,
    error,
    status,
  } = useGetAdsByAuthorQuery(authorId);

  let adsByAuthor;

  if (isLoading) {
    return <LoadingAnimation />;
  }
  if (isError) {
    adsByAuthor = error;
  } else if (isSuccess) {
    adsByAuthor = <AdsByAuthorList ads={ads} />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-6 container mx-auto py-6">
      {/* profile card */}
      <aside className="w-full lg:w-1/4">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-lg w-full"
          data-v0-t="card"
        >
          <div className="flex-col space-y-1.5 flex items-center gap-4 p-4">
            <span className="relative flex justify-center items-center shrink-0 overflow-hidden rounded-full h-24 w-24">
              <FaCircleUser size="5rem" color="#dbd9d3" />
            </span>
            <div>
              <h3 className="whitespace-nowrap font-semibold tracking-tight text-2xl text-center">
                {user.username}
              </h3>
              <p className="text-lg text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="p-4">
            <a
              className="block w-full text-center py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              href="#"
            >
              Edit Profile
            </a>
          </div>
        </div>
      </aside>

      {/* user ads list */}
      <main className="flex-1">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-lg w-full"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-1.5 p-4">
            <h3 className="whitespace-nowrap font-semibold tracking-tight text-2xl">
              My Ads
            </h3>
          </div>
          <div className="p-4">
            <div className="relative w-full overflow-auto">
              {/* table */}
              <table className="w-full caption-bottom text-sm">
                {/* table header */}
                <thead className="[&amp;_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Ads ID
                    </th>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
