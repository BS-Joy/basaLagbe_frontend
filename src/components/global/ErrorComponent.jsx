import error404 from "../../assets/404error.png";
import error503 from "../../assets/503Error.png";

const ErrorComponent = ({ error }) => {
  console.log(error);
  let serverError = false;
  let errMessage;
  if (
    error.status === "FETCH_ERROR" ||
    error.status === 500 ||
    error.status === 408
  ) {
    if (error.status === 408) {
      errMessage = error.data.error;
    } else {
      errMessage =
        error?.status === 500
          ? error.data.error
          : "Can't connect to the server";
    }

    serverError = true;
  } else {
    errMessage = error?.data?.error ?? error?.status;
    serverError = false;
  }
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
