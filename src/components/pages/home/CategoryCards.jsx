const CategoryCards = () => {
  return (
    <>
      {/*<!-- Component: E-commerce card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 border hover:shadow-md">
        {/*  <!-- Image --> */}
        <figure className="px-8 pt-8">
          <img
            src="https://images.unsplash.com/photo-1610389051254-64849803c8fd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="card image"
            className="aspect-video w-full rounded-md"
          />
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">
              Category Title
            </h3>
          </header>
          <p>Total Active Ads: 200</p>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end p-6 pt-0">
          <button className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-[rgb(66,85,112)] px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-[rgb(51,68,91)] focus:bg-indigo-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 disabled:shadow-none">
            <span>Explore all</span>
          </button>
        </div>
      </div>
      {/*<!-- End E-commerce card --> */}
    </>
  );
};

export default CategoryCards;
