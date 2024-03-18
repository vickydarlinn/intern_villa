import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <p>
        Oops page not found, Go to{" "}
        <Link className="text-red-600 font-bold" to="/">
          Home
        </Link>{" "}
      </p>{" "}
    </div>
  );
};

export default NotFound;
