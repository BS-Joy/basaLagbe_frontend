import { useGetCategoriesQuery } from "../../../feature/ads/adsSlice";
import ErrorComponent from "../../global/ErrorComponent";
import LoadingAnimation from "../../LoadingAnimation";
import CategoryCards from "./CategoryCards";

const PopularCategories = () => {
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  let data;

  if (isLoading) {
    data = <LoadingAnimation />;
  }

  if (isError) {
    if (error.status === "FETCH_ERROR") {
      data = <ErrorComponent errMessage="Can't connect to the server" />;
    } else {
      data = (
        <ErrorComponent errMessage={error?.data?.error ?? error?.status} />
      );
    }
  }

  if (isSuccess) {
    data = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 p-4 md:p-10">
        {categories?.map((category) => (
          <CategoryCards key={category?._id} category={category} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      <div className="py-28">
        <p className="text-xl pb-2 text-center">Check our</p>
        <h1 className="text-4xl font-bold text-center">Popular Categories</h1>
      </div>

      {/* category cards */}
      {data}
    </div>
  );
};

export default PopularCategories;
