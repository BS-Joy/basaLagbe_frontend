import { useGetCategoriesQuery } from "../../../feature/ads/adsSlice";
import ErrorComponent from "../../global/ErrorComponent";
import LoadingAnimation from "../../LoadingAnimation";

const AdsFilter = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const {
    data: allCategories,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery();

  let categories;

  const handleReset = () => {
    setSelectedCategoryId("");
  };

  const handleFilter = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  if (isLoading) {
    categories = <LoadingAnimation />;
  } else if (isError) {
    if (error.status === "FETCH_ERROR") {
      categories = <ErrorComponent errMessage="Can't connect to the server" />;
    } else {
      categories = (
        <ErrorComponent errMessage={error?.data?.error ?? error?.status} />
      );
    }
  } else if (isSuccess) {
    categories = allCategories.map((cat) => (
      <li key={cat?._id} className="mb-2 flex gap-2 items-center">
        <input
          onChange={handleFilter}
          checked={selectedCategoryId === cat?._id}
          className="w-4 h-4"
          type="radio"
          id={cat?.title}
          value={cat?._id}
          name={"categories"}
        />
        <label htmlFor={cat?.title}>{cat?.title}</label>
      </li>
    ));
  }

  return (
    <div className="border rounded h-min min-w-64 sticky top-[88px]">
      {/* by category */}
      <div>
        <h2 className="py-3 pl-4 border-b text-sm bg-neutral-100">
          Categories:
        </h2>
        <ul className="py-3 pl-4">{categories}</ul>
        <div className="py-3 pl-4 border-t text-sm bg-neutral-100">
          <span onClick={handleReset} className="underline cursor-pointer">
            Reset
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdsFilter;