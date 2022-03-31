import React from "react";

function NotFound() {
  return (
    <>
      <div className="container inset-0 sm:mx-auto max-w-screen-xl">
        <div className="sm:flex w-full flex-row justify-center h-screen sm:py-32 ">
          <div className="flex flex-col h-full items-center">
            <div className="flex flex-row x:w-full sm:w-fit content-center justify-center h-full mb-4">
                  <p className="text-black font-normal text-normal">page not found</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
