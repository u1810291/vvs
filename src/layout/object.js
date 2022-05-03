import React, { useState, useContext, useCallback, useEffect } from "react";
import useLanguage from "../hook/useLanguage";
import SidebarBack from "../components/sidebars/back";
import { ObjectHeader } from "../components/headers/object";
import { Events } from "../components/lists/events";
import { PhonesList } from "../api/phones";
import AuthContext from "../context/authContext";
import GlobalContext from "../context/globalContext";
import { EventsList } from "../api/events";
import { generate } from "shortid";

function Object() {
  const { english, lithuanian, t } = useLanguage();
  const { user } = useContext(AuthContext);
  const { objectName, setObjectName } = useContext(GlobalContext);
  const [objectAddress, setObjectAddress] = useState("");
  const [objectCity, setObjectCity] = useState("");
  const [objectDescription, setObjectDescription] = useState("");
  const [objectLatitude, setObjectLatitude] = useState("");
  const [objectLongitude, setObjectLongitude] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [modem, setModem] = useState("");

  const objectDescriptionFunc = useCallback(async (e) => {
    setObjectDescription(e.target.value);
  }, []);

  const objectNameFunc = useCallback(
    async (e) => {
      setObjectName(e.target.value);
    },
    [setObjectName]
  );

  const objectAddressFunc = useCallback(async (e) => {
    setObjectAddress(e.target.value);
  }, []);

  const objectCityFunc = useCallback(
    async (e) => {
      setObjectCity(e.target.value);
    },
    [setObjectCity]
  );

  const objectLongitudeFunc = useCallback(async (e) => {
    setObjectLongitude(e.target.value);
  }, []);

  const objectLatitudeFunc = useCallback(async (e) => {
    setObjectLatitude(e.target.value);
  }, []);

  const fromFunc = useCallback(async (e) => {
    setFrom(e.target.value);
  }, []);

  const toFunc = useCallback(async (e) => {
    setTo(e.target.value);
  }, []);

  const timeFunc = useCallback(async (e) => {
    setTime(e.target.value);
  }, []);

  const modemFunc = useCallback(async (e) => {
    setModem(e.target.value);
  }, []);

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center min-h-screen relative overflow-hidden">
          <div className="flex flex-col min-h-screen items-center w-full ">
            <div className="flex flex-row w-full justify-between min-h-screen ">
              <SidebarBack />
              <div className="flex flex-col min-h-screen w-full justify-between">
                <ObjectHeader />
                <div className="flex flex-row min-h-screen">
                  <div className="flex pl-4 flex-row w-full h-full justify-between">
                    <div className="flex h-full flex-col justify-between w-full pr-4 md:pr-0 md:w-3/6 lg:w-3/6">
                      <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col">
                            <div className="flex flex-row">
                              <div className="flex flex-col">
                                <div className="flex flex-row w-full">
                                  <p className="self-start text-sm text-gray-500 truncate my-2">
                                    Pavadinimas
                                  </p>
                                  <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                    *
                                  </p>
                                </div>
                                <input
                                  id="name"
                                  name="name"
                                  placeholder=""
                                  required
                                  value={objectName}
                                  onChange={objectNameFunc}
                                  className="flex h-8 w-96 border placeholder-gray-400 text-black pl-2 focus:outline-none sm:text-sm"
                                />
                              </div>
                            </div>
                            <div className="flex flex-row w-full">
                              <div className="flex mr-2 flex-col">
                                <div className="flex flex-row">
                                  <p className="self-start text-sm text-gray-500 truncate my-2">
                                    Adresas
                                  </p>
                                  <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                    *
                                  </p>
                                </div>
                                <input
                                  id="address"
                                  name="address"
                                  placeholder=""
                                  type="address"
                                  required
                                  value={objectAddress}
                                  onChange={objectAddressFunc}
                                  className="flex h-8 w-72 border placeholder-gray-400 text-black pl-2 focus:outline-none sm:text-sm"
                                />
                              </div>

                              <div className="flex flex-col">
                                <div className="flex flex-row">
                                  <p className="self-start text-sm text-gray-500 truncate my-2">
                                    Miestas
                                  </p>
                                </div>
                                <input
                                  id="city"
                                  name="city"
                                  placeholder=""
                                  value={objectCity}
                                  onChange={objectCityFunc}
                                  type="city"
                                  className="flex h-8 w-full border focus:outline-none pl-2 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex pl-2 flex-col w-full h-full">
                            <div className="flex flex-row w-full">
                              <p className="self-start text-sm text-gray-500 truncate my-2">
                                Pavadinimas
                              </p>
                            </div>
                            <textarea
                              id="answer"
                              name="answer"
                              placeholder=""
                              aria-describedby="answer"
                              rows={4}
                              value={objectDescription}
                              onChange={objectDescriptionFunc}
                              className="text-sm h-full w-full border pl-2 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col">
                            <div className="flex flex-row">
                              <div className="flex flex-row justify-between w-96">
                                <div className="flex mr-2 flex-col w-full">
                                  <div className="flex flex-row">
                                    <p className="self-start text-sm text-gray-500 truncate my-2">
                                      Latitude
                                    </p>
                                  </div>
                                  <input
                                    id="longitude"
                                    name="longitude"
                                    placeholder=""
                                    required
                                    value={objectLongitude}
                                    onChange={objectLongitudeFunc}
                                    className="flex h-8 w-full border placeholder-gray-400 pl-2 text-black focus:outline-none sm:text-sm"
                                  />
                                </div>

                                <div className="flex flex-col w-full">
                                  <div className="flex flex-row">
                                    <p className="self-start text-sm text-gray-500 truncate my-2">
                                      Longitude
                                    </p>
                                  </div>
                                  <input
                                    id="latitude"
                                    name="latitude"
                                    placeholder=""
                                    value={objectLatitude}
                                    onChange={objectLatitudeFunc}
                                    className="flex h-8 w-full border placeholder-gray-400 pl-2 text-black focus:outline-none sm:text-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold ml-6 mt-4 text-sm mb-2 text-gray-900">
                          Objekto nuotraukos
                        </p>
                        <div className="w-80 grid sm:grid-cols-1 gap-2 lg:grid-cols-2">
                          <div className="flex flex-col">
                            <p className="text-xs text-gray-400 py-1">
                              202005-01-b
                            </p>
                            <a href="#">
                              <div className="flex bg-white items-center justify-center rounded-lg shadow hover:drop-shadow-none drop-shadow h-32 overflow-hidden">
                                <img
                                  className="flex bg-cover w-2/4 h-2/4"
                                  src={require("../assets/assets/apple.png")}
                                ></img>
                              </div>
                            </a>
                          </div>

                          <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400 py-1">
                                202005-01-b
                              </p>
                              <button className="text-xs text-red-700 py-1">
                                ištrinti
                              </button>
                            </div>
                            <a href="#">
                              <div className="flex bg-white items-center justify-center rounded-lg shadow hover:shadow-none drop-shadow h-32 overflow-hidden">
                                <img
                                  className="flex bg-cover w-2/4 h-2/4"
                                  src={require("../assets/assets/apple.png")}
                                ></img>
                              </div>
                            </a>
                          </div>
                        </div>

                        <div className="w-80 mt-4 flex justify-end">
                          <button className="flex rounded-sm text-xs px-4 mb-2 py-1 font-normal items-center text-gray-400 hover:text-gray-500 bg-gray-200">
                            <p>Įkelti nuotrauką</p>
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold ml-6 mt-4 text-sm mb-2 text-gray-900">
                          Reagavimo informacija
                        </p>
                        <div className="flex flex-col">
                          <div className="flex flex-row items-end mb-2">
                            <input
                              id="send-crew"
                              name="send-crew"
                              type="checkbox"
                              className="ml-8 h-6 w-6 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                            />
                            <p className="mr-8 ml-4 text-sm text-normal truncate">
                              Siusti ekipažą automatiškai
                            </p>

                            <div className="flex flex-col ml-4 w-20">
                              <div className="flex flex-row">
                                <p className="self-start text-xs truncate my-2">
                                  Nuo
                                </p>
                              </div>
                              <input
                                id="from"
                                name="from"
                                placeholder=""
                                value={from}
                                onChange={fromFunc}
                                className="flex h-6 w-20 border text-black focus:outline-none pl-1 sm:text-sm"
                              />
                            </div>

                            <div className="flex flex-col ml-4 w-20">
                              <div className="flex flex-row">
                                <p className="self-start text-xs truncate my-2">
                                  Iki
                                </p>
                              </div>
                              <input
                                id="to"
                                name="to"
                                placeholder=""
                                value={to}
                                onChange={toFunc}
                                className="flex h-6 w-20 border text-black focus:outline-none pl-1 sm:text-sm"
                              />
                            </div>

                            <div className="flex flex-col ml-4 w-20">
                              <div className="flex flex-row">
                                <p className="self-start text-xs truncate my-2">
                                  SLA laikas min.
                                </p>
                              </div>
                              <input
                                id="time"
                                name="time"
                                placeholder=""
                                value={time}
                                onChange={timeFunc}
                                className="flex h-6 w-20 border text-black focus:outline-none pl-1 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-center">
                            <input
                              id="send-crew"
                              name="send-crew"
                              type="checkbox"
                              className="ml-8 h-6 w-6 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                            />
                            <p className="ml-4 self-start text-sm truncate my-2">
                              Skambinti po apžiuros
                            </p>
                          </div>
                          <div className="flex flex-row items-center">
                            <input
                              id="send-crew"
                              name="send-crew"
                              type="checkbox"
                              className="ml-8 h-6 w-6 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                            />
                            <p className="ml-4 self-start text-sm truncate my-2">
                              Bankomatas
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex w-full mt-12 justify-between">
                          <p className="font-semibold ml-6 mb-4 text-sm text-gray-900">
                            Įvykiai
                          </p>
                        </div>
                        <div className="overflow-y-auto h-96 scrollbar-gone">
                          {EventsList.map((data) => (
                            <Events
                              key={generate()}
                              date={data.date}
                              test={data.test}
                              signal={data.signal}
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-red-700 focus:outline-none"
                      >
                        Archyvuoti
                      </button>
                    </div>

                    <div className="flex h-full flex-col justify-between w-full pr-4 md:pr-0 md:w-1/4 lg:w-1/4 border-b border-l">
                      <div className="flex flex-col">
                        <div className="flex flex-col w-full">
                          <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                            <div className="flex ml-4 flex-row w-full">
                              <p className="text-sm truncate my-2 font-semibold">
                                Atsakingi asmenys
                              </p>
                            </div>
                          </div>

                          <div className="overflow-y-auto h-96 scrollbar-gone">
                            {PhonesList.map((data) => (
                              <div
                                key={data.id}
                                className="flex flex-row w-full border-b h-12 items-center justify-between"
                              >
                                <div className="flex ml-4 flex-row w-full justify-between">
                                  <p className="text-sm text-blue-300 font-normal truncate my-2">
                                    Vardas Pavardė
                                  </p>
                                  <p className="text-sm font-normal truncate my-2 mr-36">
                                    +37063666355
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-row w-full mt-4 h-12 items-center border-b justify-between">
                            <div className="flex ml-4 flex-row w-full">
                              <p className="text-sm truncate my-2 font-semibold">
                                Modemas
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col w-full ml-4">
                            <div className="flex flex-col w-20">
                              <div className="flex flex-row">
                                <p className="text-sm truncate mt-2 mb-1">
                                  Modemo nr.
                                </p>
                              </div>
                              <input
                                id="modem"
                                name="modem"
                                placeholder=""
                                value={modem}
                                onChange={modemFunc}
                                className="flex w-32 border h-6 border-gray-300 rounded-sm text-black focus:outline-none pl-1 sm:text-sm"
                              />
                            </div>
                            <div className="flex flex-row items-center mt-6">
                              <input
                                id="control"
                                name="control"
                                type="checkbox"
                                className="h-6 w-6 text-gray-600  focus:ring-gray-500 border-gray-300 rounded-sm"
                              />
                              <p className="ml-4 self-start text-sm truncate my-2">
                                Signalizacijos valdymas
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-row w-full mt-4 border-b h-12 items-center justify-between">
                            <div className="flex ml-4 flex-row w-full">
                              <p className="text-sm truncate my-2 font-semibold">
                                Objekto informacija
                              </p>
                            </div>
                          </div>

                          <div className="overflow-y-auto h-96 scrollbar-gone">
                            <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                              <div className="flex ml-4 flex-row w-full justify-between">
                                <p className="text-sm text-gray-400 font-normal truncate my-2">
                                  Objekto nr.
                                </p>
                                <p className="text-sm font-normal truncate my-2 mr-36">
                                  22-1-9346
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                              <div className="flex ml-4 flex-row w-full justify-between">
                                <p className="text-sm text-gray-400 font-normal truncate my-2">
                                  Sutarties nr.
                                </p>
                                <p className="text-sm font-normal truncate my-2 mr-36">
                                  FAF-5441
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                              <div className="flex ml-4 flex-row w-full justify-between">
                                <p className="text-sm text-gray-400 font-normal truncate my-2">
                                  Navisaion ID.
                                </p>
                                <p className="text-sm font-normal truncate my-2 mr-36">
                                  1167
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                              <div className="flex ml-4 flex-row w-full justify-between">
                                <p className="text-sm text-gray-400 font-normal truncate my-2">
                                  Monas MS ID.
                                </p>
                                <p className="text-sm font-normal truncate my-2 mr-36">
                                  81652
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Object;