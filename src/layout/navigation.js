/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useState } from "react";
import { OverlayProvider, usePreventScroll } from "react-aria";
import SlideOver from "../components/sidebars/slideOver";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => setIsOpen(false);

  usePreventScroll({ isDisabled: !isOpen });

  return (
    <OverlayProvider>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <div className="flex flex-col bg-slate-600 w-10 pt-6 items-center sm:w-20">
                <button className="flex flex-col items-center">
                  <img
                    onClick={() => setIsOpen(true)}
                    className="w-4 h-4 mx-16"
                    src={require("../assets/assets/hamburger.png")}
                  />
                </button>
              </div>
              {/* */}
              <SlideOver isOpen={isOpen} onClose={handleOnClose}>
                <div className="flex flex-col justify-between text-white w-96 h-full">
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <p className="flex text-normal text-gray-300 font-light">
                        Meniu
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start w-full">
                      <button className="text-gray-200 hover:text-gray-400">
                        Pultas
                      </button>
                    </div>
                    <div className="items-start flex flex-col w-full">
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Pultas
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Užduotys
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Leidimai
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Pažeidimai
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start w-full">
                      <button className="text-gray-200 hover:text-gray-400">
                        Ekipažai
                      </button>
                    </div>
                    <div className="items-start flex flex-col w-full">
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Ekipažai
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Vairuotojai
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Dislokacijos zonos
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start w-full">
                      <button className="text-gray-200 hover:text-gray-400">
                        Objektai
                      </button>
                    </div>
                    <div className="items-start flex flex-col w-full">
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Objektai
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Modemai
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Raktai
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start w-full">
                      <button className="text-gray-200 hover:text-gray-400">
                        Savitarna
                      </button>
                    </div>
                    <div className="items-start flex flex-col w-full">
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Klientai
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Pagalba
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start w-full">
                      <button className="text-gray-200 hover:text-gray-400">
                        Ataskaitos
                      </button>
                    </div>
                    <div className="items-start flex flex-col w-full">
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Ataskaita 1
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Ataskaita 2
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start w-full">
                      <button className="text-gray-200 hover:text-gray-400">
                        Nustatymai
                      </button>
                    </div>
                    <div className="items-start flex flex-col w-full">
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Nustatymai?
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Klasifikatoriai
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Vartotojai
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col text-sm items-start font-light">
                      <img src={require("../assets/assets/Line.png")}></img>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Mano paskyra
                      </button>
                      <button className="font-light text-normal text-gray-200 hover:text-gray-400">
                        Atsijungti
                      </button>
                    </div>
                  </div>
                </div>
              </SlideOver>
            </div>
          </div>
        </div>
      </div>
    </OverlayProvider>
  );
}

export default Navigation;
