import oopsImage from "../../assets/oops.png";

const ErrorComponent = ({ errMessage }) => {
  return (
    <div className="flex flex-col items-center gap-8 bg-white my-8 py-8">
      {/* <div> */}
      <img src={oopsImage} className="w-[30%] sm:w-[20%]" alt="oops" />
      <h1 className="uppercase tracking-widest text-red-500 font-bold">
        ERR: {errMessage}
      </h1>
      {/* </div> */}
    </div>
  );
};

export default ErrorComponent;
