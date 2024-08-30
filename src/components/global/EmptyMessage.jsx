import { Link } from "react-router-dom";
import emptyStatusImage from "../../assets/Empty.svg"

const EmptyMessage = ({message}) => {
    return (
        <div className="flex flex-col items-center">
            <img className="w-3/4 bg-slate-200 p-8 rounded-full sm:w-1/4" src={emptyStatusImage} alt="empty" />
            <p className="text-black font-bold mt-6 text-xl text-center">{message}</p>
            <Link to="/postAds" className="flex justify-center bg-[rgb(60,80,107)] px-6 py-2 rounded text-white mt-4 hover:bg-slate-600">Post an add</Link>
        </div>
    );
}

export default EmptyMessage;
