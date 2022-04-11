import React from "react";
import BPM from "../components/logos/bpm";
import LoginForm from "../components/forms/login";
import useLanguage from "../hook/useLanguage";

function Login() {
  const { english, lithuanian, t } = useLanguage();

  return (
    <>
      <div className="container inset-0 sm:mx-auto max-w-screen-xl">
        <div className="sm:flex w-full flex-row justify-center h-screen sm:py-32 ">
          <div className="flex flex-col h-full items-center">
            <div className="flex flex-row x:w-full sm:w-fit content-center justify-center h-full mb-4">
              <div className="flex-1 flex flex-col sm:py-12 sm:px-6 lg:flex-none xl:px-24">
                <div className="flex w-screen h-60 sm:hidden">
                </div>
                <div className="flex w-full flex-col justify-center x:pt-10 sm-pt-0 px-10">
                  <BPM />
                  <div className="mt-8">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
