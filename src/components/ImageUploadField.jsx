import { IoCloseCircleSharp } from "react-icons/io5";

const ImageUploadField = ({
  onChangeHandle,
  handleSelectedImage,
  selectedImages,
}) => {
  return (
    <>
      <div className="relative my-6">
        <p className="block text-sm font-medium text-gray-600 pb-2">
          Upload Images
        </p>
        <input
          required
          id="id-dropzone01"
          name="images"
          type="file"
          className="absolute top-10 w-full h-full opacity-0"
          multiple
          accept="image/*"
          onChange={onChangeHandle}
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
          <span className="text-gray-500"> click to upload</span>
        </label>
      </div>
      <div className="flex gap-4 my-6">
        {selectedImages &&
          selectedImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                className="w-28 h-28 border rounded z-30"
                src={img}
                alt="selected_images"
              />
              <span
                onClick={() => handleSelectedImage(img)}
                className="text-xl absolute -top-3 -right-4 rounded-full cursor-pointer"
              >
                <IoCloseCircleSharp />
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default ImageUploadField;
