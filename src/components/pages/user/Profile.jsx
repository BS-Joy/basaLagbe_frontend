import { FaCircleUser } from "react-icons/fa6";
import AdsByAuthorTable from "./AdsByAuthorTable";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../feature/user/userSlice";

const Profile = () => {
  const user = useSelector(getCurrentUser);
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
              <AdsByAuthorTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
