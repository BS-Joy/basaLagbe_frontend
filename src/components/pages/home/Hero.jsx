import SearchNow from "./SearchNow";
import hero from "../../../assets/hero2.jpg";

const Hero = ({
  isAdsPage,
  divFormParams,
  distFormParams,
  areaFormParams,
  resetInputFields,
}) => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${hero})` }}
        className="bg-cover backdrop-blur-md"
      >
        <div className="backdrop-blur-[1.5px] py-28">
          <div className="text-white text-center py-16 my-4">
            <h1 className="text-2xl md:text-3xl mb-3">Over 500+ active user</h1>
            <h1 className="text-4xl md:text-5xl font-extrabold shadow-lg">
              Find Your New Address
            </h1>
          </div>
          <SearchNow
            isAdsPage={isAdsPage}
            divFormParams={divFormParams}
            distFormParams={distFormParams}
            areaFormParams={areaFormParams}
            resetInputFields={resetInputFields}
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
