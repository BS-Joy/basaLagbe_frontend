import CategoryCards from "./CategoryCards";


const PopularCategories = () => {
    return (
        <div className="container mx-auto px-6">
            <div className="py-28">
                <p className="text-xl pb-2 text-center">Check our</p>
                <h1 className="text-4xl font-bold text-center">Popular Categories</h1>
            </div>

            {/* category cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 p-4 md:p-10 bg-[rgb(51,68,91)] rounded-md">
                <CategoryCards />
                <CategoryCards />
                <CategoryCards />
                <CategoryCards />
                <CategoryCards />
                <CategoryCards />
            </div>
            
        </div>
    );
}

export default PopularCategories;
