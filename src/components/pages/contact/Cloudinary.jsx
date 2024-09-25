import React, { useEffect, useRef } from "react";

const Cloudinary = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "di1qocbyt",
        uploadPreset: "basaLagbe",
      },
      (error, result) => {
        console.log(result);
      }
    );
  }, []);
  return (
    <div className="text-center bg-blue-400 h-72">
      <h1 className="text-white py-8 text-2xl">Upload an image</h1>
      <button
        onClick={() => widgetRef.current.open()}
        className="bg-red-500 p-2"
      >
        Upload
      </button>
    </div>
  );
};

export default Cloudinary;
