import React, { Suspense, useState } from "react";
import LoadingAnimation from "../../../LoadingAnimation";

const defaultImageUrl =
  "https://res.cloudinary.com/di1qocbyt/image/upload/v1727499375/basaLagbe/d7ofx4ej9pxio7xifipd.webp";

const AdDetailThumbnail = ({ adThumbnail, adImages }) => {
  const [thumbnail, setThumbnail] = useState(
    adThumbnail ? adThumbnail?.url : ""
  );
  const [loading, setLoading] = useState(true);

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
      <figure className="w-full flex justify-center">
        {loading && <LoadingAnimation />}
        <img
          src={thumbnail || adImages[0]?.url || defaultImageUrl}
          alt="card image"
          className="object-fill lg:max-w-[700px] lg:max-h-[468px] rounded border"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </figure>

      {/* images */}
      {adImages?.length > 0 && (
        <div className="flex justify-start sm:justify-center gap-2 overflow-x-auto scroll-smooth">
          {loading && <LoadingAnimation />}
          <figure
            onClick={() => handleThumbnail(adThumbnail?.url)}
            className={`w-28 h-28 lg:w-36 lg:h-36 cursor-pointer flex-shrink-0 ${
              thumbnail === adThumbnail?.url &&
              "border-b-4 border-b-orange-500 rounded"
            }`}
          >
            <img
              src={adThumbnail?.url}
              alt="card image"
              className="object-cover w-full h-full rounded border"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </figure>
          {adImages?.map((img, index) => (
            <React.Fragment key={index}>
              {loading && <LoadingAnimation />}
              <figure
                onClick={() => handleThumbnail(img?.url)}
                key={index}
                className={`w-28 h-28 lg:w-36 lg:h-36 cursor-pointer border flex-shrink-0 ${
                  thumbnail === img?.url &&
                  "border-b-4 border-b-orange-500 rounded"
                }`}
              >
                <img
                  src={img?.url}
                  alt="card image"
                  className="object-cover w-full h-full rounded"
                  onLoad={() => setLoading(false)}
                  onError={() => setLoading(false)}
                />
              </figure>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdDetailThumbnail;
