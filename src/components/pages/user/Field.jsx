import React from "react";

const Field = ({children, error}) => {
  return (
    <div className="mb-5">
      {children}
      <p className="text-red-500">{error?.message}</p>
    </div>
  );
};

export default Field;
