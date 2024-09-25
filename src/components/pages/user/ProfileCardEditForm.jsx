import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getStatus,
  updateUser,
} from "../../../feature/user/userSlice";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";

const ProfileCardEditForm = ({ user, setEditMode }) => {
  const profilePictureUrl = user?.profilePicture
    ? `${import.meta.env.VITE_PROFILE_PICTURE_BASE_URL}/${user?.profilePicture}`
    : "";

  const [userData, setUserData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [profilePicture, setProfilePicture] = useState(profilePictureUrl || "");
  const [selectedProfilePicture, setSelectedProfilePicture] = useState("");

  // const errorStatus = useSelector(getError);
  const reqState = useSelector(getStatus);

  const fileInputFieldRef = useRef(null);

  const dispatch = useDispatch();

  const clickFileInputField = (e) => {
    e.preventDefault();

    fileInputFieldRef.current.click();
    // fileInputFieldRef.current.addEventListener("change", handleImageChange);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const selcetedImageUrl = URL.createObjectURL(e.target.files[0]);
    setSelectedProfilePicture(selcetedImageUrl);
    setProfilePicture(e.target.files[0]);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("profilePicture", profilePicture);

    try {
      const res = dispatch(
        updateUser({ userData: formData, userId: user?._id })
      ).unwrap();

      toast.promise(res, {
        loading: "Loading...",
        success: "Profile updated successfully",
      });
      setEditMode(false);
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl underline">Edit Profile</h2>
      <form className="flex flex-col gap-2" encType="multipart/form-data">
        {/* profile picture */}
        <div className="flex justify-center">
          {profilePicture ? (
            <div className="relative">
              <span
                onClick={clickFileInputField}
                className="w-28 h-28 flex justify-center items-center rounded-full overflow-hidden border-4 border-[#33445B] hover:cursor-pointer"
              >
                <img
                  src={selectedProfilePicture || profilePicture}
                  alt={user?.username}
                  className="w-full h-full object-cover object-center"
                />
              </span>
              <button
                onClick={clickFileInputField}
                className="bg-[#33445B] text-white rounded-full p-2 absolute bottom-0 right-0 cursor-pointer"
              >
                <MdEdit />
              </button>
            </div>
          ) : (
            <div className="relative">
              <span
                onClick={clickFileInputField}
                className="relative flex justify-center items-center overflow-hidden rounded-full h-24 w-24 border-4 border-[#33445B] hover:cursor-pointer"
              >
                <FaCircleUser
                  color="#dbd9d3"
                  className="w-full h-full object-cover object-center"
                />
              </span>
              <button
                onClick={clickFileInputField}
                className="bg-[#33445B] text-white rounded-full p-[6px] absolute bottom-0 right-0 cursor-pointer"
              >
                <MdEdit size="13px" />
              </button>
            </div>
          )}
          <input
            name="profilePicture"
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputFieldRef}
            onChange={handleImageChange}
          />
        </div>

        {/* username */}
        <div className="flex flex-col">
          <label className="text-gray-600" htmlFor="username">
            Username
          </label>
          <input
            required
            onChange={handleChange}
            className="border py-1 pl-2 pr-1 text-gray-700 focus:border-black rounded outline-none"
            value={userData.username}
            type="text"
            name="username"
          />
        </div>

        {/* email */}
        <div className="flex flex-col">
          <label className="text-gray-600" htmlFor="username">
            Email
          </label>
          <input
            required
            onChange={handleChange}
            className="border py-1 pl-2 pr-1 text-gray-700 focus:border-black rounded outline-none"
            value={userData.email}
            type="email"
            name="email"
          />
        </div>

        {/* submit cancel button */}
        <div className="flex justify-between gap-2 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 w-full text-white py-1 rounded transition-all"
          >
            {reqState === "loading" ? "Updating..." : "Update"}
          </button>
          <button
            onClick={() => setEditMode(false)}
            className=" text-red-500 py-1 rounded hover:bg-red-100 border border-red-500 w-full transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileCardEditForm;
