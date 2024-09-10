import { useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../feature/api/apiSlice";
import ErrorComponent from "../../global/ErrorComponent";
import LoadingAnimation from "../../LoadingAnimation";

const AdsFilter = ({
  selectedCategory,
  setSelectedCategory,
  catFormSearchParams,
}) => {
  const {
    data: allCategories,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery();

  const [searchParams, setSearchParams] = useSearchParams();

  let categories;

  const handleReset = () => {
    setSelectedCategory("");
    setSearchParams("");
  };

  const handleFilter = (e) => {
    const categoryTitle = e.target.value;
    setSelectedCategory(categoryTitle);
    setSearchParams({ cat: categoryTitle });
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
          checked={selectedCategory === cat?.title}
          className="w-4 h-4"
          type="radio"
          id={cat?.title}
          value={cat?.title}
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
