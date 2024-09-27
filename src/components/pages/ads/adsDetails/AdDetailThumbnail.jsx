import React, { useState } from "react";

const defaultImageUrl =
  "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const AdDetailThumbnail = ({ adThumbnail, adImages }) => {
  const [thumbnail, setThumbnail] = useState(
    adThumbnail ? adThumbnail?.url : ""
  );

  const handleThumbnail = (img) => {
    setThumbnail(img);
  };
  return (
    <div
      className={`flex flex-col gap-2 p-2 rounded ${
        thumbnail && adImages && "border"
      } justify-between`}
    >
      {/* thumbnail */}
      <figure className="w-full  flex justify-center">
        <img
          src={thumbnail || adImages[0]?.url || defaultImageUrl}
          alt="card image"
          className="object-contain max-w-[700px] aspect-video rounded border"
        />
      </figure>

      {/* images */}
      {1 && (
        <div className="flex justify-center gap-2 overflow-auto scroll-smooth">
          <figure
            onClick={() => handleThumbnail(adThumbnail?.url)}
            className={`max-w-72 mx-h-96 cursor-pointer ${
              thumbnail === adThumbnail?.url &&
              "border-b-4 border-b-orange-500 rounded"
            }`}
          >
            <img
              src={adThumbnail?.url}
              alt="card image"
              className="object-fill rounded border"
            />
          </figure>
          {adImages?.map((img, index) => (
            <figure
              onClick={() => handleThumbnail(img?.url)}
              key={index}
              className={`max-w-72 mx-h-96 cursor-pointer border ${
                thumbnail === img?.url &&
                "border-b-4 border-b-orange-500 rounded"
              }`}
            >
              <img
                src={img?.url}
                alt="card image"
                className="object-fill w-full h-full rounded"
              />
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdDetailThumbnail;
