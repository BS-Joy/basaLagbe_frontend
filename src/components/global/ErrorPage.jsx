import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  console.log(error);
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <h1 className="uppercase font-semibold text-xl tracking-widest text-gray-500">
        404 | Page Not Found
      </h1>
    </div>
  );
};

export default ErrorPage;
