import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage;

  if (error?.message) {
    errorMessage = error.message;
  } else if (error?.data) {
    errorMessage = error?.error?.message;
  } else {
    errorMessage = "404 | Page Not Found";
  }

  // console.log({ error });
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <h1 className="uppercase font-semibold text-xl tracking-widest text-gray-500">
        {errorMessage}
      </h1>
    </div>
  );
};

export default ErrorPage;
