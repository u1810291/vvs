import React from "react";

function NotFound() {
  return (
    <>
      <div className="container inset-0 sm:mx-auto max-w-screen-xl">
        <div className="sm:flex w-full flex-row justify-center h-screen sm:py-32 ">
          <div className="flex flex-col h-full items-center">
            <div className="flex flex-row x:w-full sm:w-fit content-center justify-center h-full mb-4">
              <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
                <div className="max-w-max mx-auto">
                  <main className="sm:flex">
                    <p className="text-4xl font-extrabold text-slate-600 sm:text-5xl">
                      404
                    </p>
                    <div className="sm:ml-6">
                      <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                          Page not found
                        </h1>
                        <p className="mt-1 text-base text-gray-500">
                          Please check the URL in the address bar and try again.
                        </p>
                      </div>
                      <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                        <a
                          href="#"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                        >
                          Go back home
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                        >
                          Contact support
                        </a>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
