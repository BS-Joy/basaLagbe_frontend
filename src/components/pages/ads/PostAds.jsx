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
import ImageUploadField from "../../ImageUploadField";

const PostAds = () => {
  const [state, dispatch] = useReducer(postAdsReducer, initialState);
  const [images, setImages] = useState();
  const [districtLists, setDistrictLists] = useState([]);
  const [areaLists, setAreaLists] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <option value="">Select Category</option>
        {allCategories.map((cat) => (
          <option key={cat?._id} value={cat?._id}>
            {cat?.title}
          </option>
        ))}
      </>
    );
  }

  //  handle district
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

  // of: handle flat data input
  const inputHandle = (e) => {
    dispatch({
      type: "addFlatData",
      payload: { [e.target.name]: e.target.value },
    });
  };

  // of: handle image upload
  const handleImages = (e) => {
    const filesArray = Array.from(e.target.files).map((file) => {
      const url = URL.createObjectURL(file);
      return url;
    });
    setImages(filesArray);
    dispatch({ type: "addImages", payload: e.target.files });
  };

  // of: handle selected images
  const handleSelectedImage = (img) => {
    const imgIndex = images.indexOf(img);
    const allImages = state.images;
    delete allImages[imgIndex];
    const newImages = images.filter((i) => i !== img);
    setImages(newImages);
  };

  // of: submit form handle
  const submitHandle = (e) => {
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
    formData.append("contact[whatsapp]", state.flatData.whatsapp || "");
    formData.append("address", state.flatData.address);

    // Append images (if it's an array of files)
    if (state.images && state.images.length > 0) {
      state.images.forEach((image, index) => {
        formData.append(`images`, image); // This will append each image file
      });
    }

    try {
      setLoading(true);
      const res = postAds(formData).unwrap();
      toast.promise(res, {
        loading: "Creating ad...",
        success: (res) => {
          e.target.reset();
          navigate(`/ads/${res?._id}`);
          return "Ad posted successfully.";
        },
      });
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
            onChange={(e) =>
              dispatch({ type: "addTitle", payload: e.target.value })
            }
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
            onChange={(e) =>
              dispatch({ type: "addDescription", payload: e.target.value })
            }
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
              <option value="">Select Division</option>
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
              required
              onChange={areaHandle}
              id="district"
              name="district"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              value={state.district}
            >
              <option value="">
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
              required
              onChange={(e) =>
                dispatch({ type: "addArea", payload: e.target.value })
              }
              id="area"
              name="area"
              className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
              value={state.area}
            >
              <option value="">
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
              required
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
              required
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
              required
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
              required
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
              <option value="">Select Month</option>
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
              required
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
            required
            onChange={inputHandle}
            id="address"
            name="address"
            className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
            placeholder="Enter detailed address"
          ></textarea>
        </div>

        {/* upload images */}
        <ImageUploadField
          onChangeHandle={handleImages}
          handleSelectedImage={handleSelectedImage}
          selectedImages={images}
          fieldName="images"
        />

        {/* Post Button */}
        <div className="mb-4">
          <button
            disabled={loading === true ? true : false}
            type="submit"
            className="w-full bg-slate-600 hover:bg-slate-700 text-white p-2 rounded-md"
          >
            {loading === true ? "Posting..." : "Post"}
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
