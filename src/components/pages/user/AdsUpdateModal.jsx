import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getMonths } from "../../../utils/postAdsUtils";
import {
  useGetCategoriesQuery,
  useUpdateAdMutation,
} from "../../../feature/api/apiSlice";
import toast from "react-hot-toast";
import ImageUploadField from "../../ImageUploadField";
import SmallLoadingAnimation from "../../SmallLoadingAnimation";

export default function AdsUpdateModal({
  isShowing,
  setIsShowing,
  selectedAd,
  setSelectedAd,
}) {
  const wrapperRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const upCommingMonths = getMonths();
  const [updateAd] = useUpdateAdMutation();

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

  // of:  for close the modal on click outside of the modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    let html = document.querySelector("html");

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden";

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const modal = document.querySelector("#modal"); // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements);

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false);
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });

        firstFocusableElement.focus();
      } else {
        html.style.overflowY = "visible";
      }
    }
  }, [isShowing]);

  // of: handle remove seleted image
  const handleSelectedImages = (img) => {
    const a = { ...selectedAd };
    if (a?.isUpdatingImages === false) a.isUpdatingImages = true;

    if (img?.public_id) {
      a.deletedImages = [...a.deletedImages, img?.public_id];
      a.allImages = a.allImages.filter((i) => i.url !== img.url);
      if (a?.images?.length > 0) {
        a.images = a.images.filter((i) => i.url !== img.url);
      }
      if (img?.public_id === a.thumbnail.public_id) a["thumbnail"] = {};
    } else {
      a.allImages = a.allImages.filter((i) => i !== img);
      a.newImages = a.newImages.filter((i) => i !== img);
    }

    setSelectedAd(a);
  };

  // of: handle images
  const handleImageChange = (e) => {
    const ad = { ...selectedAd };
    if (ad?.isUpdatingImages === false) ad.isUpdatingImages = true;

    const imgArrays = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );

    ad.allImages = [...ad.allImages, ...imgArrays];
    ad.newImages = [...ad.newImages, ...Array.from(e.target.files)];

    setSelectedAd(ad);
  };

  // of: handlechange
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "phone" || name === "whatsapp") {
      setSelectedAd({
        ...selectedAd,
        contact: { ...selectedAd.contact, [name]: value },
      });
    } else if (name === "availableForm") {
      setSelectedAd({
        ...selectedAd,
        [name]: value,
        isUpdatingAvailableForm: true,
      });
    } else {
      setSelectedAd({ ...selectedAd, [name]: value });
    }
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("_id", selectedAd?._id);
    formData.append("title", selectedAd.title);
    formData.append("description", selectedAd.description);
    formData.append("category", selectedAd.category);
    formData.append("rent", selectedAd.rent);
    formData.append("floor", selectedAd.floor);
    formData.append("bedroom", selectedAd.bedroom);
    formData.append("bathroom", selectedAd.bathroom);
    formData.append("availableForm", selectedAd.availableForm);
    formData.append("contact[phone]", selectedAd?.contact.phone);
    formData.append("contact[whatsapp]", selectedAd?.contact.whatsapp || "");
    formData.append(
      "isUpdatingAvailableForm",
      selectedAd.isUpdatingAvailableForm
    );
    if (Object.keys(selectedAd.thumbnail).length > 0) {
      formData.append("thumbnail[url]", selectedAd.thumbnail?.url);
      formData.append("thumbnail[public_id]", selectedAd.thumbnail?.public_id);
    }

    if (selectedAd.images?.length > 0) {
      selectedAd.images.forEach((img, index) => {
        // Append each property of the image object
        formData.append(`images[${index}][url]`, img.url);
        formData.append(`images[${index}][public_id]`, img.public_id);
      });
    }

    formData.append("isUpdatingImages", selectedAd.isUpdatingImages);

    if (selectedAd.deletedImages.length > 0) {
      console.log(selectedAd.deletedImages);
      selectedAd.deletedImages.forEach((img) => {
        formData.append("deletedImages", img);
      });
    }
    // Append new images as files
    if (selectedAd.newImages.length > 0) {
      selectedAd.newImages.forEach((imageFile) => {
        formData.append("newImages", imageFile);
      });
    }

    setLoading(true);

    try {
      const res = await updateAd(formData).unwrap();
      if (res?._id) {
        setLoading(false);
        setIsShowing(false);
        toast.success("Ad updated successfully");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.data?.error);
    }
  };

  return (
    <>
      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-4a content-4a"
              aria-modal="true"
              tabIndex="-1"
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh] sm:w-3/4 flex-col gap-4 overflow-auto rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header id="header-4a" className="flex items-center">
                  <h3 className="flex-1 text-2xl font-bold text-slate-700 py-3 underline">
                    Edit Ad
                  </h3>
                  <button
                    onClick={() => setIsShowing(false)}
                    className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide  text-[rgb(51,68,91)] transition duration-300 hover:bg-[rgb(51,68,91)] hover:text-white focus:bg-[rgb(186,202,226)] focus:text-[rgb(51,68,91)] focus-visible:outline-none "
                    aria-label="close dialog"
                  >
                    <span className="relative only:-mx-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-79 desc-79"
                      >
                        <title id="title-79">Icon title</title>
                        <desc id="desc-79">
                          A more detailed description of the icon
                        </desc>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </header>

                {/*        <!-- Modal body --> */}
                <div id="content-4a" className="flex-1">
                  <form
                    onSubmit={submitHandle}
                    className="w-full mx-auto bg-white p-6 rounded-md shadow-md"
                  >
                    {/* upade images */}
                    <ImageUploadField
                      onChangeHandle={handleImageChange}
                      selectedImages={selectedAd?.allImages}
                      handleSelectedImage={handleSelectedImages}
                      fieldName="newImages"
                    />

                    {/* Title */}
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Title
                      </label>
                      <input
                        onChange={handleChange}
                        required
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                        placeholder="Title"
                        value={selectedAd.title}
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
                        onChange={handleChange}
                        required
                        id="description"
                        name="description"
                        className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                        placeholder="Put some descreption to attract more buyer"
                        value={selectedAd.description}
                      ></textarea>
                    </div>

                    {/* Two-Column Layout */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Category */}
                      <div className="mb-4">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Category
                        </label>
                        <select
                          onChange={handleChange}
                          required
                          id="category"
                          name="category"
                          className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                          value={selectedAd.category}
                        >
                          {!isError ? (
                            categories
                          ) : (
                            <option
                              className="text-red-500"
                              defaultValue="Select Category"
                            >
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
                          onChange={handleChange}
                          type="number"
                          id="rent"
                          name="rent"
                          className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                          placeholder="Enter rent per month"
                          value={selectedAd?.rent}
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
                          onChange={handleChange}
                          type="number"
                          id="floor"
                          name="floor"
                          className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                          placeholder="Enter floor number"
                          value={selectedAd?.floor}
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
                          onChange={handleChange}
                          type="number"
                          id="bedroom"
                          name="bedroom"
                          className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                          placeholder="Enter number of bedrooms"
                          value={selectedAd?.bedroom}
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
                          onChange={handleChange}
                          type="number"
                          id="bathroom"
                          name="bathroom"
                          className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                          placeholder="Enter number of bathrooms"
                          value={selectedAd?.bathroom}
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
                          onChange={handleChange}
                          required
                          id="availableForm"
                          name="availableForm"
                          className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                          value={selectedAd?.availableForm}
                        >
                          <option value="Select Month">Select Month</option>
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
                          onChange={handleChange}
                          type="text"
                          id="phone"
                          name="phone"
                          className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                          placeholder="Enter phone number"
                          value={selectedAd?.contact?.phone}
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
                          onChange={handleChange}
                          type="text"
                          id="whatsapp"
                          name="whatsapp"
                          className="mt-1 p-2 outline-none focus:border-black w-full border rounded-sm"
                          placeholder="Enter what's app number if available for better reach"
                          value={selectedAd?.contact?.whatsapp}
                        />
                      </div>
                    </div>

                    {/* update Button */}
                    <div className="mb-4">
                      <button
                        type="submit"
                        className="w-full flex justify-center bg-slate-600 hover:bg-slate-700 text-white p-2 rounded-md"
                      >
                        {loading ? (
                          <SmallLoadingAnimation fillColor="fill-white" />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
