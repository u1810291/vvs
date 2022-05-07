/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
// import SidebarBack from "../components/sidebars/back";
import { CreateHeader } from "../components/headers/create";
import { StandardMap } from "../feature/mapStandard";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import SlideOver from "../components/sidebars/slideOver";
import { OverlayProvider, usePreventScroll } from "react-aria";
import MainSidebar from "../components/sidebars/main";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 55.95,
  lng: 23.33,
};

const option = {
  styles: StandardMap,
  disableDefaultUI: true,
  zoomControl: true,
};

const markerIcon = {
  title: "",
  path: "M20.325 22.1125C20.325 22.6093 19.9218 23.0125 19.425 23.0125C18.9282 23.0125 18.525 22.6093 18.525 22.1125C18.525 21.6157 18.9282 21.2125 19.425 21.2125C19.9218 21.2125 20.325 21.6157 20.325 22.1125ZM24.6 29.2H17.4V15.7C17.4 15.2032 17.8032 14.8 18.3 14.8H23.7C24.1968 14.8 24.6 15.2032 24.6 15.7V29.2ZM29.1 29.2H26.4V14.8C26.4 13.8055 25.5945 13 24.6 13H17.4C16.4064 13 15.6 13.8055 15.6 14.8V29.2H12.9C12.4032 29.2 12 29.6032 12 30.1C12 30.5968 12.4032 31 12.9 31H29.1C29.5968 31 30 30.5968 30 30.1C30 29.6032 29.5968 29.2 29.1 29.2Z",
  fillColor: "#ffffff",
};

function Create() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [clickedPos, setClickedPos] = useState({});
  const [textArea, setTextArea] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => setIsOpen(false);

  usePreventScroll({ isDisabled: !isOpen });

  const onMapClick = useCallback((e) => {
    // console.log(e);
    setClickedPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }, []);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyCM9HFBcLjd0qeL0dgtFwOpeqUWy-aAB5M",
  // });

  const textAreaFunc = useCallback(
    async (e) => {
      setTextArea(e.target.value);
      // Min 1 count and no Max length:
      // eslint-disable-next-line no-useless-escape
      const pattern = /^.{1,}$/;
      const result = pattern.test(textArea);
      if (result === true) {
        setTextValid(true);
      } else {
        setTextValid(false);
      }
    },
    [textArea]
  );

  const backFunc = useCallback(async () => {
    navigate(-1);
  }, [navigate]);

  return (
      <OverlayProvider>
        <div className="container max-w-screen-xl">
          <div className="flex w-screen flex-row justify-center h-screen">
            <div className="flex flex-col h-full items-center w-full">
              <div className="flex flex-row w-full justify-between h-full">
              <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
                <button onClick={backFunc}>
                  <img src={require("../assets/assets/left.png")}></img>
                </button>
                <img
                  className="pt-6"
                  src={require("../assets/assets/Line.png")}
                ></img>
                <button className="flex flex-col items-center pt-6">
                  <img
                    onClick={() => setIsOpen(true)}
                    className="w-4 h-4 mx-16"
                    src={require("../assets/assets/hamburger.png")}
                  />
                </button>
              </div>

              <div className="flex flex-col h-full w-full justify-between">
                <CreateHeader />
                <div className="flex flex-col h-full">
                  <div className="pl-4 flex-col w-full h-full">
                    <div className="flex h-full flex-col w-full pr-4 md:pr-0 md:w-3/5 lg:w-2/6">
                      <div className="flex flex-col">
                        <div className="flex flex-row w-full">
                          <Menu
                            as="div"
                            className="relative inline-block text-left w-full mr-4"
                          >
                            <div className="flex flex-col  w-full">
                              <div className="flex flex-row">
                                <p className="self-start text-sm text-gray-500 truncate my-2">
                                  Tipas
                                </p>
                                <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                  *
                                </p>
                              </div>
                              <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
                                <p className="text-gray-600 self-center truncate">
                                  Nepriskirtas
                                  {/* {item.operator === "0"
                          ? "Any [Multiple choices]"
                          : item.operator === "1"
                          ? "1"
                          : "2"} */}
                                </p>
                                <ChevronDownIcon
                                  className="-mr-1 ml-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-32 sm:w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button

                                        // onClick={}
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                            : "text-center truncate w-full text-gray-700",
                                          "block px-4 py-2 text-sm"
                                        )}
                                      >
                                        1
                                      </button>
                                    )}
                                  </Menu.Item>

                                  <Menu.Item>
                                    {({ active }) => (
                                      <button

                                        // onClick={}
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                            : "text-center truncate w-full text-gray-700",
                                          "block w-full text-left px-4 py-2 text-sm"
                                        )}
                                      >
                                        2
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                          <div className="flex flex-col w-full mb-4 ">
                            <div className="flex flex-row">
                              <p className="self-start text-sm text-gray-500 truncate my-2">
                                Pavadinimas
                              </p>
                              <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                *
                              </p>
                            </div>
                            <input
                              id="search"
                              name="search"
                              placeholder=""
                              // onChange={}
                              // value={item.objectAddress}
                              className="flex w-full h-8 border placeholder-gray-400 text-gray-400 focus:outline-none sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-row ">
                            <p className="font-normal text-md text-gray-500">
                              Aprašymas
                            </p>
                            <p className="self-start ml-1 text-red-600 text-sm truncate">
                                *
                              </p>
                          </div>
                          <div className="mt-1">
                            <div className="flex flex-row">
                              <textarea
                                id="text"
                                name="text"
                                placeholder=""
                                value={textArea}
                                onChange={textAreaFunc}
                                aria-describedby="text-description"
                                rows={4}
                                className="block w-full shadow-sm sm:text-sm border text-gray-400 rounded-md focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <Menu
                          as="div"
                          className="relative inline-block text-left w-full mb-4"
                        >
                          <div className="flex flex-col  w-full">
                            <div className="flex flex-row">
                              <p className="self-start text-sm text-gray-500 truncate my-2">
                                Objektas / Adresas
                              </p>
                              <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                *
                              </p>
                            </div>
                            <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
                              <p className="text-gray-600 self-center truncate">
                                Žukauskio g 1
                                {/* {item.operator === "0"
                          ? "Any [Multiple choices]"
                          : item.operator === "1"
                          ? "1"
                          : "2"} */}
                              </p>
                              <ChevronDownIcon
                                className="-mr-1 ml-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-32 sm:w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      // onClick={}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                          : "text-center truncate w-full text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      1
                                    </button>
                                  )}
                                </Menu.Item>

                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      // onClick={}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                          : "text-center truncate w-full text-gray-700",
                                        "block w-full text-left px-4 py-2 text-sm"
                                      )}
                                    >
                                      2
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                          <div className="w-full h-72 relative overflow-hidden">
                            <GoogleMap
                              mapContainerStyle={containerStyle}
                              center={center}
                              zoom={12}
                              onLoad={onLoad}
                              onUnmount={onUnmount}
                              onClick={onMapClick}
                            >
                              {clickedPos.lat ? (
                                <Marker
                                  // icon={markerIcon}
                                  position={clickedPos}
                                />
                              ) : null}
                              <></>
                            </GoogleMap>
                          </div>
                        <Menu
                          as="div"
                          className="relative inline-block text-left w-full my-4"
                        >
                          <div className="flex flex-col  w-full">
                            <div className="flex flex-row">
                              <p className="self-start text-sm text-gray-500 truncate my-2">
                                Ekipažas
                              </p>
                              <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                *
                              </p>
                            </div>
                            <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
                              <p className="text-gray-600 self-center truncate">
                                Priskirti automatiškai
                                {/* {item.operator === "0"
                          ? "Any [Multiple choices]"
                          : item.operator === "1"
                          ? "1"
                          : "2"} */}
                              </p>
                              <ChevronDownIcon
                                className="-mr-1 ml-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-32 sm:w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      // onClick={}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                          : "text-center truncate w-full text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      1
                                    </button>
                                  )}
                                </Menu.Item>

                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      // onClick={}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                          : "text-center truncate w-full text-gray-700",
                                        "block w-full text-left px-4 py-2 text-sm"
                                      )}
                                    >
                                      2
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <SlideOver isOpen={isOpen} onClose={handleOnClose}>
                <MainSidebar />
              </SlideOver>
            </div>
          </div>
        </div>
      </OverlayProvider>
  );
}

export default Create;
