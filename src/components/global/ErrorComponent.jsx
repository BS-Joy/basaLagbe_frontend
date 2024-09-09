import error404 from "../../assets/404error.png";
import error503 from "../../assets/503Error.png";

const ErrorComponent = ({ errMessage, serverError }) => {
  return (
    <div className="flex flex-col items-center gap-8 bg-white my-8 py-8">
      <img
        src={serverError ? error503 : error404}
        className="w-[30%] sm:w-[20%]"
        alt="oops"
      />
      <h1 className="uppercase tracking-widest text-red-500 font-bold">
        ERR: {errMessage}
      </h1>
    </div>
  );
};

export default ErrorComponent;
