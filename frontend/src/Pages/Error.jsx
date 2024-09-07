import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  console.log(`error data`, error);

  return (
    <div className="bg-black text-white">
      {error.status === 404 ? (
        <div className=" section-container  grid place-content-center min-h-[100vh]  ">
          <h1 className="text-6xl font-extrabold text-blue-700 mb-8 text-center laptop:text-7xl laptop:mb-12">
            404
          </h1>

          <h3 className="text-3xl font-bold  mb-5 capitalize text-center laptop:text-5xl laptop:mb-8">
            page not found
          </h3>

          <Link to={"/"}>
            {" "}
            <div className="flex justify-center items-center">
              <button className="capitalize btn btn-accent">
                Go back home
              </button>
            </div>
          </Link>
        </div>
      ) : (
        <main className="grid min-h-[100vh] place-items-center px-8 ">
          <h4 className="text-center font-bold text-4xl">
            there was an error...{" "}
          </h4>
        </main>
      )}
    </div>
  );
};

export default Error;
