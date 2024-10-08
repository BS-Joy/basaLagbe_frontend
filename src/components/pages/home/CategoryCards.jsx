import { useNavigate, useSearchParams } from "react-router-dom";

const defaultThumbnail =
  "https://plus.unsplash.com/premium_photo-1680281937008-f9b19ed9afb6?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CategoryCards = ({ category }) => {
  const thumbnail = category?.thumbnail || defaultThumbnail;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const redirect = (title) => {
    navigate("/ads");
    setSearchParams({ cat: title });
  };
  return (
    <>
      {/*<!-- Component: E-commerce card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 border hover:shadow-md">
        {/*  <!-- Image --> */}
        <figure className="px-8 pt-8">
          <img
            src={thumbnail}
            alt={category?.title}
            className="aspect-video w-full rounded-md"
          />
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">
              {category?.title}
            </h3>
          </header>
          <p>Total Active Ads: {category?.totalActiveAds}</p>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end p-6 pt-0">
          <button
            onClick={() => redirect(category?.title)}
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-[rgb(66,85,112)] px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-[rgb(51,68,91)] focus:bg-indigo-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 disabled:shadow-none"
          >
            <span>Explore all</span>
          </button>
        </div>
      </div>
      {/*<!-- End E-commerce card --> */}
    </>
  );
};

export default CategoryCards;
