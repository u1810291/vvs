/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { ObjectHeader } from "../components/headers/object";
import { Events } from "../components/lists/events";
import { PhonesList } from "../api/phones";
import { useParams } from "react-router-dom";
import GlobalContext from "../context/globalContext";
import AuthContext from "../context/authContext";
import { Spinner } from "react-activity";
import { EventsList } from "../api/events";
import { generate } from "shortid";
import SlideOver from "../components/sidebars/slideOver";
import { OverlayProvider, usePreventScroll } from "react-aria";
import MainSidebar from "../components/sidebars/main";
import useUtils from "../hook/useUtils";
import {
  objectPageImagesQuery,
  objectPageQuery,
  objectPage,
  imagesUpdate,
} from "../api/queryForms/queryString/query";
import {
  objectPageImagesAPImutation,
  objectPageImagesMutation,
  objectPageQueryCorrespondPersons,
  imagesUpdateMutation,
} from "../api/queryForms/queryString/mutation";
import { objectPageImagesUpdate } from "../api/queryForms/queryString/update";
import useReactQuery from "../hook/useQuery";
import { useFetch } from "../hook/useFetch";

function Object() {
  const { id } = useParams();
  const hiddenFileInput = useRef(null);
  const { objectName, setObjectName } = useContext(GlobalContext);
  const { objectPageImages, setObjectPageImages } = useContext(GlobalContext);
  const { accessToken, user } = useContext(AuthContext);
  const [objectAddress, setObjectAddress] = useState("");
  const [objectCity, setObjectCity] = useState("");
  const [objectDescription, setObjectDescription] = useState("");
  const [objectLatitude, setObjectLatitude] = useState("");
  const [objectLongitude, setObjectLongitude] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [modem, setModem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [responsiblePersons, setResponsiblePersons] = useState({});
  const [objectImages, setObjectImages] = useState({});
  const [objectPageData, setObjectPageData] = useState({});
  const [pictures, setPictures] = useState([]);
  const [blobImage, setBlobImage] = useState("");
  const [photoId, setPhotoId] = useState("")

  // remember to swap that with user id
  const imageInsertVariables = {
    imagepath: blobImage[0]?.data,
    id: blobImage[0]?.name,
    user: id,
    imagename: blobImage[0]?.name,
  };

    const imageUpdateVariables = {
      imagepath: photoId,
      imagename: "test",
    };

  const data = useReactQuery( // fetchImages
    objectPage,
    {},
    accessToken
  );

  const {
    data: dataData,
    error: dataError,
    loading: dataLoading,
    fetchImages: dataFetchImages,
  } = useFetch(objectPageImagesMutation, imageInsertVariables, accessToken); // imagesUpdate

  const { data: imageData } = useReactQuery(objectPageImagesUpdate, imageUpdateVariables, accessToken);

  useEffect(() => {
    if (data.status === "success") {
    const base64images = data?.data?.images;
    let arr = base64images.map(b => {
      if (b.imagename !== null) {
      return b.imagepath
      }
    })
    setPictures(arr);
  }
  },[data.status]);

  // useEffect(() => {
  //     console.log('data ', data);
  //   // setQueryObject(data);
  //   setResponsiblePersons(data?.data?.corresppersons);
  //   setObjectImages(data?.data?.objectimages);
  //   setObjectPageData(data?.data?.objects);
  //   console.log(data?.data?.objects)
  //   // console.log(objectPageData, objectImages, responsiblePersons);
  //   // console.log(queryObject.data.corresppersons[0]);
  //   // console.log(queryObject.data.objectimages)
  //   // console.log(queryObject.data.objects[0])
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOnOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  usePreventScroll({ isDisabled: !isOpen });
  const { backFunc } = useUtils();

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

  async function onImageChange(e) {
    if (e.target.files) {
      let files = [...e.target.files];
      let image = await Promise.all(
        files.map((f) => {
          return readAsDataURL(f);
        })
      );
      setBlobImage(image);
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setObjectPageImages((prev) => prev.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  }

  useEffect(() => {
    if (blobImage) {
    dataFetchImages();
    }
  },[blobImage])

  function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        return resolve({
          data: fileReader.result,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      };
      fileReader.readAsDataURL(file);
    });
  }

  const renderPhotos = (source) => {
    if (source) {
    return source.map((photo, index) => {
      return (
        <div key={generate()} className="flex flex-col">
          <div className="flex flex-row justify-between">
            <p className="text-xs text-gray-400 py-1">
              {generate()}
            </p>
            <button
              onClick={() => removeImage(photo)}
              className="text-xs text-red-700 py-1"
            >
              ištrinti
            </button>
          </div>
          <a>
            <div className="flex bg-white items-center justify-center rounded-lg shadow hover:shadow-none drop-shadow h-32 overflow-hidden">
              <img className="flex bg-cover w-full h-full" src={photo}></img>
            </div>
          </a>
        </div>
      );
    })}
  };

  const removeImage = useCallback(
    async (id) => {
      console.log('id', id)
      setPhotoId(id);
      // setObjectPageImages((oldState) => oldState.filter((item) => item !== id)); 
      // updateFetchImages();
    },
    []
  );

  const handleClick = useCallback((event) => {
    hiddenFileInput.current.click();
  }, []);

  return (
    <>
      {!data ? (
        <div className="flex h-screen w-screen bg-gray-100 justify-center items-center">
          <Spinner color="dark-blue" size={40} />
        </div>
      ) : (
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
                        onClick={handleOnOpen}
                        className="w-4 h-4 mx-16"
                        src={require("../assets/assets/hamburger.png")}
                      />
                    </button>
                  </div>
                  <div className="flex flex-col min-h-full w-full justify-between">
                    <ObjectHeader fetch={dataFetchImages} />
                    <div className="flex flex-col min-h-screen sm:min-h-0 overflow-scroll sm:h-full">
                      <div className="flex pl-4 flex-row justify-between">
                        <div className="flex h-full flex-col w-full pr-4 md:pr-0 md:w-3/6 lg:w-3/6">
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
                                      value={data?.data?.objects[0].name} // objectName
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
                                      value={data?.data?.objects[0].address} // objectAddress
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
                                      value={data?.data?.objects[0].city} // objectCity
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
                                  value={data?.data?.objects[0].notes} // objectDescription
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
                              {pictures.length === 0 ? (
                                <>
                                  <div className="flex flex-col">
                                    <p className="text-xs h-6 text-gray-400 py-1"></p>
                                    <a>
                                      <div className="flex bg-white items-center justify-center rounded-lg shadow hover:drop-shadow-none drop-shadow h-32 overflow-hidden">
                                        <img
                                          className="flex bg-cover w-2/4 h-2/4"
                                          src={require("../assets/assets/apple.png")}
                                        ></img>
                                      </div>
                                    </a>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-xs h-6 text-gray-400 py-1"></p>
                                    <a>
                                      <div className="flex bg-white items-center justify-center rounded-lg shadow hover:drop-shadow-none drop-shadow h-32 overflow-hidden">
                                        <img
                                          className="flex bg-cover w-2/4 h-2/4"
                                          src={require("../assets/assets/apple.png")}
                                        ></img>
                                      </div>
                                    </a>
                                  </div>
                                </>
                              ) : pictures.length === 1 ? (
                                <div className="flex flex-col">
                                  <p className="text-xs h-6 text-gray-400 py-1"></p>
                                  <a>
                                    <div className="flex bg-white items-center justify-center rounded-lg shadow hover:drop-shadow-none drop-shadow h-32 overflow-hidden">
                                      <img
                                        className="flex bg-cover w-2/4 h-2/4"
                                        src={require("../assets/assets/apple.png")}
                                      ></img>
                                    </div>
                                  </a>
                                </div>
                              ) : null}
                              {renderPhotos(pictures)}
                              {renderPhotos(objectPageImages)}
                            </div>

                            <div className="w-80 mt-4 flex justify-end">
                              <button
                                className="flex rounded-sm text-xs px-4 mb-2 py-1 font-normal items-center text-gray-400 hover:text-gray-500 bg-gray-200"
                                onClick={handleClick}
                              >
                                Ikelti nuotrauką
                              </button>
                              <input
                                type="file"
                                accept="image/*"
                                ref={hiddenFileInput}
                                onChange={onImageChange}
                                className="hidden"
                              ></input>
                            </div>
                          </div>

                          <div>
                            <p className="font-semibold ml-6 text-sm mb-2 text-gray-900">
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
                                    type="text"
                                    pattern="[0-9]*"
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
                                    type="text"
                                    pattern="[0-9]*"
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
                                    type="text"
                                    pattern="[0-9]*"
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
                            <div className="h-full">
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
                            className="hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-red-700 hover:bg-red-600 focus:outline-none"
                          >
                            Archyvuoti
                          </button>
                        </div>

                        <div className="flex h-full flex-col justify-between w-full pr-4 md:pr-0 md:w-1/4 lg:w-1/4 border-b border-l">
                          <div className="flex flex-col">
                            <div className="flex flex-col w-full h-full">
                              <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                <div className="flex ml-4 flex-row w-full">
                                  <p className="text-sm truncate my-2 font-semibold">
                                    Atsakingi asmenys
                                  </p>
                                </div>
                              </div>

                              <div className="overflow-y-auto scrollbar-gone">
                                {data?.data?.corresppersons.map((data) => (
                                  <div
                                    key={generate()}
                                    className="flex flex-row w-full border-b h-12 items-center justify-between"
                                  >
                                    <div className="flex ml-4 flex-row w-full justify-between">
                                      <p className="text-sm text-blue-300 font-normal truncate my-2">
                                        {data.name}
                                      </p>
                                      <p className="text-sm font-normal truncate my-2 mr-36">
                                        {data.phone}
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

                              <div className="flex flex-col w-full">
                                <div className="flex flex-col w-full">
                                  <div className="flex flex-row">
                                    <p className="text-sm ml-4 truncate mt-2 mb-1">
                                      Modemo nr.
                                    </p>
                                  </div>
                                  <input
                                    id="modem"
                                    name="modem"
                                    placeholder=""
                                    value={modem}
                                    onChange={modemFunc}
                                    className="flex w-32 ml-4 border h-6 border-gray-300 rounded-sm text-black focus:outline-none pl-1 sm:text-sm"
                                  />
                                </div>
                                <div className="flex flex-row items-center mt-6">
                                  <input
                                    id="control"
                                    name="control"
                                    type="checkbox"
                                    className="h-6 w-6 ml-4 text-gray-600  focus:ring-gray-500 rounded-sm"
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

                              <div className="h-full">
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Objekto nr.
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      {data?.data?.objects[0].obdindx}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Sutarties nr.
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      {data?.data?.objects[0].contract}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Navision ID.
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
                                    {data?.data?.objects[0].Id}
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
                <SlideOver isOpen={isOpen} onClose={handleOnClose}>
                  <MainSidebar />
                </SlideOver>
              </div>
            </div>
          </div>
        </OverlayProvider>
      )}
    </>
  );
}

export default Object;
