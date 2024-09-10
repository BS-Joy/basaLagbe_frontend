import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { bdAreas, bdDistricts, bdDivisions } from "../../../utils/postAdsUtils";

const SearchNow = ({
  isAdsPage,
  divFormParams,
  distFormParams,
  areaFormParams,
  resetInputFields,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // of: all states
  const [queryParmas, setQueryParmas] = useState({
    div: divFormParams || "",
    dist: distFormParams || "",
    area: areaFormParams || "",
  });
  const [districts, setDistricts] = useState(
    divFormParams ? bdDistricts[queryParmas?.div] : []
  );
  const [areas, setAreas] = useState(
    distFormParams ? bdAreas[queryParmas?.div][queryParmas?.dist] : []
  );

  useEffect(() => {
    if (resetInputFields) {
      setQueryParmas({
        div: "",
        dist: "",
        area: "",
      });
      setDistricts([]); // Reset districts and areas
      setAreas([]);
    }
  }, [resetInputFields]);

  // of: get districts using divison and set division to the queryParmas state
  const getDistricts = (e) => {
    const divi = e.target.value;
    const allDistricts = bdDistricts[divi];
    setDistricts(allDistricts);
    setQueryParmas({ ...queryParmas, div: divi });
  };

  // of: get areas using district and set district to the queryParmas state
  const getAreas = (e) => {
    const dist = e.target.value;
    const allAreas = bdAreas[queryParmas.div][dist];
    setAreas(allAreas);
    setQueryParmas({ ...queryParmas, dist });
  };

  // of: setting area to the queryParamas state
  const handleAreas = (e) => {
    const area = e.target.value;
    setQueryParmas({ ...queryParmas, area });
  };

  // of: handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const x = new URLSearchParams(queryParmas);
    if (!isAdsPage) {
      navigate("/ads");
      setSearchParams(x);
    } else {
      setSearchParams(x);
    }
  };

  return (
    <div className="w-full container px-6 pb-14 mx-auto">
      <form className="bg-white flex flex-col md:flex-row gap-3 rounded overflow-hidden ml-3">
        {/* divison */}
        <div className="relative my-3 md:w-1/4">
          <select
            onChange={getDistricts}
            value={queryParmas.div}
            id="division"
            name="division"
            required
            className="peer relative h-10 w-full appearance-none rounded bg-white px-4 text-sm outline-none transition-all autofill:bg-white focus:border-indigo-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option value="Select Division">Select Division</option>
            {bdDivisions?.map((divi, index) => (
              <option key={index} value={divi}>
                {divi}
              </option>
            ))}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-indigo-500 peer-disabled:cursor-not-allowed"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-labelledby="title-04 description-04"
            role="graphics-symbol"
          >
            <title id="title-04">Arrow Icon</title>
            <desc id="description-04">Arrow icon of the select list.</desc>
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* district */}
        <div className="relative my-3 md:w-1/4">
          <select
            onChange={getAreas}
            value={queryParmas.dist}
            id="district"
            name="district"
            required
            className="peer relative h-10 w-full appearance-none rounded bg-white px-4 text-sm outline-none transition-all autofill:bg-white focus:border-indigo-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            {districts?.length > 0 ? (
              <>
                <option value="Select District">Select District</option>
                {districts?.map((dist, index) => (
                  <option key={index} value={dist}>
                    {dist}
                  </option>
                ))}
              </>
            ) : (
              <option value="Select Division First">
                Select Division First
              </option>
            )}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-indigo-500 peer-disabled:cursor-not-allowed"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-labelledby="title-04 description-04"
            role="graphics-symbol"
          >
            <title id="title-04">Arrow Icon</title>
            <desc id="description-04">Arrow icon of the select list.</desc>
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* area */}
        <div className="relative my-3 md:w-1/4">
          <select
            onChange={handleAreas}
            value={queryParmas.area}
            id="area"
            name="area"
            required
            className="peer h-10 w-full appearance-none rounded bg-white px-4 text-sm outline-none transition-all autofill:bg-white focus-visible:outline-none focus:focus-visible:outline-none"
          >
            {areas?.length > 0 ? (
              <>
                <option value="Select Area">Select Area</option>
                {areas?.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </>
            ) : (
              <option value="Select District First">
                Select District First
              </option>
            )}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-indigo-500 peer-disabled:cursor-not-allowed"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-labelledby="title-04 description-04"
            role="graphics-symbol"
          >
            <title id="title-04">Arrow Icon</title>
            <desc id="description-04">Arrow icon of the select list.</desc>
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* button */}
        <Link
          onClick={handleSearch}
          className="bg-[rgb(51,68,91)] transition py-4 md:p-0 hover:bg-[rgb(61,82,109)] text-white md:w-1/4 flex justify-center"
        >
          <button className="">
            <span className="flex items-center gap-2">
              <span className="bg-white text-black p-[.30rem] rounded-full">
                <MdOutlineSearch />
              </span>
              Search Now
            </span>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchNow;
