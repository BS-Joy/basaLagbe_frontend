import { FaCircleUser } from "react-icons/fa6";

const ProfileCardData = ({ user, setEditMode }) => {
  const profilePictureUrl = user?.profilePicture
    ? `${import.meta.env.VITE_PROFILE_PICTURE_BASE_URL}/${user?.profilePicture}`
    : "";

  return (
    <>
      {/*  not edit mode */}
      <div className="flex-col space-y-1.5 flex items-center gap-4 p-4 dark:bg-[#33445B]">
        {/* profile picture */}
        {user?.profilePicture ? (
          <div className="w-28 h-28 flex justify-center items-center rounded-full overflow-hidden">
            <img
              src={user?.profilePicture?.url}
              alt={user?.username}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ) : (
          <span className="relative flex justify-center items-center shrink-0 overflow-hidden rounded-full h-24 w-24">
            <FaCircleUser size="5rem" color="#dbd9d3" />
          </span>
        )}

        {/* user name & email */}
        <div>
          <h3 className="whitespace-nowrap font-semibold tracking-tight text-2xl text-center">
            {user.username}
          </h3>
          <p className="text-lg text-gray-600">{user.email}</p>
        </div>
      </div>
      {/* edit profile button */}
      <div className="p-4">
        <button
          onClick={() => setEditMode(true)}
          className="block w-full text-center py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-all"
          href="#"
        >
          Edit Profile
        </button>
      </div>
    </>
  );
};

export default ProfileCardData;
