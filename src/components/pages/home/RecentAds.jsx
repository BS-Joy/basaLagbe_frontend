import RecentAdsCarousel from "./RecentAdsCarousel";


const RecentAds = () => {
    return (
        <div className="container mx-auto px-6 pb-28">
            <div className="py-28">
                <p className="text-xl pb-2 text-center">Check</p>
                <h1 className="text-4xl font-bold text-center">Recent Ads</h1>
            </div>

            {/* category cards */}
            <RecentAdsCarousel />
        </div>
    );
}

export default RecentAds;
