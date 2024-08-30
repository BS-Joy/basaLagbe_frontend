import { MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";

const SearchNow = () => {
  return (
    <div className="w-full container px-6 pb-14 mx-auto">
      <form className="bg-white flex flex-col md:flex-row gap-3 rounded overflow-hidden ml-3">
        {/* divison */}
        <div className="relative my-3 md:w-1/4">
          <select
            id="division"
            name="division"
            required
            className="peer relative h-10 w-full appearance-none rounded bg-white px-4 text-sm outline-none transition-all autofill:bg-white focus:border-indigo-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option defaultValue="">Division</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
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
            id="district"
            name="district"
            required
            className="peer relative h-10 w-full appearance-none rounded bg-white px-4 text-sm outline-none transition-all autofill:bg-white focus:border-indigo-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option defaultValue="">District</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
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
            id="area"
            name="area"
            required
            className="peer h-10 w-full appearance-none rounded bg-white px-4 text-sm outline-none transition-all autofill:bg-white focus-visible:outline-none focus:focus-visible:outline-none"
          >
            <option defaultValue="">Area</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
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
        <Link className="bg-[rgb(51,68,91)] transition py-4 md:p-0 hover:bg-[rgb(61,82,109)] text-white md:w-1/4 flex justify-center">
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
