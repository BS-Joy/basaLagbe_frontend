import { useReducer, useState } from "react";
import {
  useGetCategoriesQuery,
  usePostAdsMutation,
} from "../../../feature/api/apiSlice";
import { getMonths, bdDistricts, bdAreas } from "../../../utils/postAdsUtils";
import { initialState, postAdsReducer } from "../../../reducers/postAdsReducer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../feature/user/userSlice";
import toast from "react-hot-toast";
import { IoCloseCircleSharp } from "react-icons/io5";

const PostAds = () => {
  const [state, dispatch] = useReducer(postAdsReducer, initialState);
  const [images, setImages] = useState();
  const [districtLists, setDistrictLists] = useState([]);
  const [areaLists, setAreaLists] = useState([]);

  const navigate = useNavigate();

  const [postAds] = usePostAdsMutation();

  const upCommingMonths = getMonths();

  const user = useSelector(getCurrentUser);

  const {
    data: allCategories,
    isLoading,
    isSuccess,
    isError,
  } = useGetCategoriesQuery();

  let categories;

  if (isLoading) {
    categories = <option defaultValue="loading...">Loading...</option>;
  } else if (isSuccess) {
    categories = (
      <>
        <option defaultValue="Select Your Division">Select Category</option>
        {allCategories.map((cat) => (
          <option key={cat?._id} value={cat?._id}>
            {cat?.title}
          </option>
        ))}
      </>
    );
  }

  // of: handle title
  const getTitle = (e) => {
    dispatch({ type: "addTitle", payload: e.target.value });
  };

  // of: handle description
  const getDesc = (e) => {
    dispatch({ type: "addDescription", payload: e.target.value });
  };

  // of: handle district
  const districtHandle = (e) => {
    const div = e.target.value;
    dispatch({ type: "addDivision", payload: div });
    setDistrictLists(bdDistricts[div]);
  };

  // of: handle area
  const areaHandle = (e) => {
    const dist = e.target.value;
    dispatch({ type: "addDistrict", payload: dist });
    setAreaLists(bdAreas[state.division][dist]);
  };

  // of: get area
  const getArea = (e) => {
    dispatch({ type: "addArea", payload: e.target.value });
  };

  // of: handle flat data input
  const inputHandle = (e) => {
    dispatch({
      type: "addFlatData",
      payload: { [e.target.name]: e.target.value },
    });
  };

  // of: submit form handle
  const submitHandle = async (e) => {
    e.preventDefault();

    // Create a FormData instance
    const formData = new FormData();

    // Append primitive data
    formData.append("authorId", user?._id);
    formData.append("title", state.title);
    formData.append("location[division]", state.division);
    formData.append("location[district]", state.district);
    formData.append("location[area]", state.area);
    formData.append("description", state.description);
    formData.append("category", state.flatData.category);
    formData.append("rent", state.flatData.rent);
    formData.append("floor", state.flatData.floor);
    formData.append("bedroom", state.flatData.bedroom);
    formData.append("bathroom", state.flatData.bathroom);
    formData.append("availableForm", state.flatData.availableForm);
    formData.append("contact[phone]", state.flatData.phone);
    formData.append("contact[whatsapp]", state.flatData.whatsapp);
    formData.append("address", state.flatData.address);

    // Append images (if it's an array of files)
    if (state.images && state.images.length > 0) {
      state.images.forEach((image, index) => {
        formData.append(`images`, image); // This will append each image file
      });
    }

    try {
      const res = await postAds(formData).unwrap();

      if (res?._id) {
        e.target.reset();
        toast.success("Ads posted successfully");
        navigate(`/ads/${res?._id}`);
      }
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div className="py-8">
        <h1 className="text-4xl font-bold bg-[rgb(60,80,107)] text-white text-center rounded py-6">
          Post New Ads
        </h1>
      </div>
      <form
        onSubmit={submitHandle}
        className="w-full mx-auto bg-white p-6 rounded-md shadow-md"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            onChange={getTitle}
            required
            type="text"
            id="title"
            name="title"
            className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
            placeholder="Title"
            value={state.title}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            onChange={getDesc}
            required
            id="description"
            name="description"
            className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
            placeholder="Put some descreption to attract more buyer"
            value={state.description}
          ></textarea>
        </div>

        {/* Two-Column Layout */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Division */}
          <div className="mb-4">
            <label
              htmlFor="division"
              className="block text-sm font-medium text-gray-600"
            >
              Division
            </label>
            <select
              onChange={districtHandle}
              required
              id="division"
              name="division"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              value={state.division}
            >
              <option defaultValue="Select Your Division">
                Select Division
              </option>
              <option value="Dhaka">Dhaka</option>
              <option value="Barishal">Barishal</option>
              <option value="Khulna">Khulna</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
          </div>

          {/* District */}
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-600"
            >
              District
            </label>
            <select
              onChange={areaHandle}
              id="district"
              name="district"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              value={state.district}
            >
              <option
                defaultValue={
                  districtLists?.length > 0
                    ? "Select District"
                    : "Select Division First"
                }
              >
                {districtLists?.length > 0
                  ? "Select District"
                  : "Select Division First"}
              </option>
              {districtLists?.length > 0
                ? districtLists.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))
                : ""}
            </select>
          </div>

          {/* Area */}
          <div className="mb-4">
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-600"
            >
              Area
            </label>
            <select
              onChange={getArea}
              id="area"
              name="area"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              value={state.area}
            >
              <option
                defaultValue={
                  areaLists?.length > 0
                    ? "Select Area"
                    : "Select District First"
                }
              >
                {areaLists?.length > 0
                  ? "Select Area"
                  : "Select District First"}
              </option>
              {areaLists?.length > 0
                ? areaLists.map((area, index) => (
                    <option key={index} value={area}>
                      {area}
                    </option>
                  ))
                : ""}
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <select
              onChange={inputHandle}
              required
              id="category"
              name="category"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
            >
              {!isError ? (
                categories
              ) : (
                <option className="text-red-500" defaultValue="Select Category">
                  Something went wrong
                </option>
              )}
            </select>
          </div>

          {/* Rent */}
          <div className="mb-4">
            <label
              htmlFor="rent"
              className="block text-sm font-medium text-gray-600"
            >
              Rent
            </label>
            <input
              onChange={inputHandle}
              type="number"
              id="rent"
              name="rent"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              placeholder="Enter rent per month"
            />
          </div>

          {/* Floor */}
          <div className="mb-4">
            <label
              htmlFor="floor"
              className="block text-sm font-medium text-gray-600"
            >
              Floor
            </label>
            <input
              onChange={inputHandle}
              type="number"
              id="floor"
              name="floor"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              placeholder="Enter floor number"
            />
          </div>

          {/* Bedroom */}
          <div className="mb-4">
            <label
              htmlFor="bedroom"
              className="block text-sm font-medium text-gray-600"
            >
              Bedroom
            </label>
            <input
              onChange={inputHandle}
              type="number"
              id="bedroom"
              name="bedroom"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              placeholder="Enter number of bedrooms"
            />
          </div>

          {/* Bathroom */}
          <div className="mb-4">
            <label
              htmlFor="bathroom"
              className="block text-sm font-medium text-gray-600"
            >
              Bathroom
            </label>
            <input
              onChange={inputHandle}
              type="number"
              id="bathroom"
              name="bathroom"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              placeholder="Enter number of bathrooms"
            />
          </div>

          {/* available form */}
          <div className="mb-4">
            <label
              htmlFor="availableForm"
              className="block text-sm font-medium text-gray-600"
            >
              Available Form
            </label>
            <select
              onChange={inputHandle}
              required
              id="availableForm"
              name="availableForm"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              value={state.flatData.availableForm}
            >
              <option defaultValue="Select Month">Select Month</option>
              {upCommingMonths.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone
            </label>
            <input
              onChange={inputHandle}
              type="text"
              id="phone"
              name="phone"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              placeholder="Enter phone number"
            />
          </div>

          {/* WhatsApp */}
          <div className="mb-4">
            <label
              htmlFor="whatsapp"
              className="block text-sm font-medium text-gray-600"
            >
              WhatsApp
            </label>
            <input
              onChange={inputHandle}
              type="text"
              id="whatsapp"
              name="whatsapp"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              placeholder="Enter what's app number if available for better reach"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <textarea
            onChange={inputHandle}
            id="address"
            name="address"
            className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
            placeholder="Enter detailed address"
          ></textarea>
        </div>

        {/* upload images */}
        <div className="relative my-6">
          <p className="block text-sm font-medium text-gray-600 pb-2">
            Upload Images
          </p>
          <input
            id="id-dropzone01"
            name="images"
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={(e) => {
              const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
              );
              setImages(filesArray);
              dispatch({ type: "addImages", payload: e.target.files });
            }}
          />
          <label
            htmlFor="id-dropzone01"
            className="relative flex cursor-pointer flex-col items-center gap-4 rounded border border-dashed border-slate-300 px-3 py-6 text-center text-sm font-medium transition-colors"
          >
            <span className="inline-flex h-12 items-center justify-center self-center rounded-full bg-slate-100/70 px-3 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="File input icon"
                role="graphics-symbol"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </span>
            <span className="text-slate-500">
              Drag & drop or
              <span className="text-gray-500"> click to upload</span>
            </span>
          </label>
        </div>
        <div className="flex gap-4 my-6">
          {images &&
            images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  className="w-28 h-28 border rounded z-30"
                  src={img}
                  alt="selected_images"
                />
                <span
                  onClick={() => {
                    const imgIndex = images.indexOf(img);
                    const allImages = { ...state.images };
                    // console.log("before delete: ", allImages);
                    delete allImages[imgIndex];
                    dispatch({ type: "addImages", payload: allImages });
                    const newImages = images.filter((i) => i !== img);
                    setImages(newImages);
                  }}
                  className="text-xl absolute -top-3 -right-4 rounded-full cursor-pointer"
                >
                  <IoCloseCircleSharp />
                </span>
              </div>
            ))}
        </div>

        {/* Post Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-slate-700 text-white p-2 rounded-md"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAds;

{
  /* other facilities */
}
{
  /* <div className="mb-4">
<label >Other Facilities:</label>
<div className="flex gap-1">
  <input id="lift" name="lift" type="checkbox" />
  <label htmlFor="lift">Lift</label>
</div>
<div className="flex gap-1">
  <input id="garage" name="garage" type="checkbox" />
  <label htmlFor="garage">Garage</label>
</div>
<div className="flex gap-1">
  <input id="gashLine" name="gashLine" type="checkbox" />
  <label htmlFor="gashLine">Gash Line</label>
</div>
<div className="flex gap-1">
  <input id="generator" name="generator" type="checkbox" />
  <label htmlFor="generator">Generator</label>
</div>
</div> */
}
