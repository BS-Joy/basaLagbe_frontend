import AdsByAuthorTable from "./AdsByAuthorTable";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../feature/user/userSlice";
import ProfileCard from "./ProfileCard";

const ProfilePage = () => {
  const user = useSelector(getCurrentUser);
  return (
    <div className="flex flex-col lg:flex-row gap-4 px-6 container mx-auto py-6">
      {/* profile card */}
      <ProfileCard user={user} />

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

export default ProfilePage;
