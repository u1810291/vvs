/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { ObjectHeader } from "../../components/headers/object";
import { Events } from "../../components/lists/events";
import { PhonesList } from "../../api/phones";
import { useParams } from "react-router-dom";
import GlobalContext from "../../context/globalContext";
import AuthContext from "../../context/authContext";
import { Spinner } from "react-activity";
import { EventsList } from "../../api/events";
import { generate } from "shortid";
import SlideOver from "../../components/sidebars/slideOver";
import { OverlayProvider, usePreventScroll } from "react-aria";
import MainSidebar from "../../components/sidebars/main";
import useUtils from "../../hook/useUtils";
import {
  objectPageImagesQuery,
  objectPageQuery,
  objectPage,
  imagesUpdate,
} from "../../api/queryForms/queryString/query";
import {
  imageUpload,
  uploadImageURI,
  deleteImageURI,
} from "../../api/queryForms/queryString/mutation";
import { objectPageImagesUpdate } from "../../api/queryForms/queryString/update";
import useReactQuery from "../../hook/useQuery";
import { useFetch } from "../../hook/useFetch";

function Object() {
  const { id } = useParams();
  const { accessToken, user } = useContext(AuthContext);
  const { objectPageImages, setObjectPageImages } = useContext(GlobalContext);
  const hiddenFileInput = useRef(null);
  const [objDesc, setObjDesc] = useState("");
  const [objName, setObjName] = useState("");
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
  const [photoId, setPhotoId] = useState("");
  const [navId, setNavId] = useState("");
  const [monasId, setMonasId] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imageName, setImageName] = useState([]);
  const [imagesName, setImagesName] = useState("");
  const [obj, setObj] = useState("");

  const deleteVariables = {
    imagepath: photoId,
  };

  const uploadVariables = {
    namespace: "vvs",
    path: `object/anothername.jpeg`, // /${imageName}
    base64: "data:image/png;base64,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"
  };

  const uploadURIVariables = {
    updateURI: {
      Id: id,
      imagepath: imagePath,
      imagename: pictures,
    },
  };

  const data = useReactQuery(objectPage, {}, accessToken);

  const {
    data: imageResponse,
    error: imageResponseError,
    loading: imageResponseLoading,
    fetchData,
  } = useFetch(imageUpload, uploadVariables, accessToken);

  const {
    data: databaseResponse,
    error: databaseResponseError,
    loading: databaseResponseLoading,
    fetchData: databaseFetch,
  } = useFetch(uploadImageURI, uploadURIVariables, accessToken);

  const {
    data: deleteImageResponse,
    error: deleteImageResponseError,
    loading: deleteImageResponseLoading,
    fetchData: deleteImageFetch,
  } = useFetch(deleteImageURI, deleteVariables, accessToken);

  console.log("upload image... ", imageResponse);
  // console.log("upload url... ", databaseResponse);
  // console.log("rerendering... ", data);
  // console.log('blob image...', blobImage);

  useEffect(() => {
    let hasura;
    let monas;
    let image;
    if (data.status === "success") {
      monas = data.data.objects;
      hasura = data.data.monas_related;
      image = data.data.monas_images_related;
      const monasHasuraMerge = hasura.map((m) => ({
        ...m,
        ...monas.find((hasura) => String(hasura.Id) === String(m.Id)),
      }));
      const monasImageMerge = image.map((m) => ({
        ...m,
        ...monas.find((hasura) => String(hasura.Id) === String(m.Id)),
      }));

      const obj = monasHasuraMerge.find((obj) => {
        return String(obj.Id) === String(id);
      });

      const images = monasImageMerge.filter((obj) => {
        return String(obj.Id) === String(id);
      });

      setObj(obj);
      setModem(obj?.modem);
      setNavId(obj?.navid);
      setMonasId(obj?.monasdid);
      setObjName(obj?.name);
      setObjectAddress(obj?.address);
      setObjectCity(obj?.city);
      objectDescriptionFunc(obj?.notes);
      if (images.length > 1) {
        const path = images?.map((e) => {
          return e.imagepath;
        });
        const name = images?.map((e) => {
          return e.imagename;
        });
        setPictures(path);
        setImagesName(name);
      } else if (images.length < 1) {
        setPictures([]);
        setImagesName([]);
      } else {
        setPictures([images.imagepath]);
        setImagesName([images.imagename]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.data]);

  useEffect(() => {
    if (imageResponse) {
      const base64images = imageResponse?.data?.storeFile?.uri;
      setImagePath(base64images);
      if (base64images) {
        databaseFetch();
      }
    }
  }, [imageResponse]);

  useEffect(() => {
    if (databaseResponse) {
      const base64images = imageResponse?.image;
      setPictures(base64images);
    }
  }, [databaseResponse]);

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

  const objectNameFunc = useCallback(async (e) => {
    setObjName(e.target.value);
  }, []);

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
      setBlobImage(image[0].data);
      setImageName(image[0].name);
      fetchData();
      // const fileArray = Array.from(e.target.files).map((file) =>
      //   URL.createObjectURL(file)
      // );
      // setObjectPageImages((prev) => prev.concat(fileArray));
      // Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  }

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

  const renderPhotos = (source, name) => {
    if (source) {
      return source.map((photo, index) => {
        return (
          <div key={generate()} className="flex flex-col">
            <div className="flex flex-row justify-between">
              <p className="text-xs text-gray-400 py-1">{generate()}</p>
              <button
                onClick={() => removeImage(photo)}
                className="text-xs text-red-700 py-1"
              >
                ištrinti
              </button>
            </div>
            <a>
              <div className="flex bg-white items-center justify-center rounded-lg shadow hover:shadow-none drop-shadow h-32 overflow-hidden">
                <img
                  className="flex bg-cover w-full h-full"
                  src={`http://ecfs.swarm.testavimui.eu${photo}`}
                ></img>
              </div>
            </a>
          </div>
        );
      });
    }
  };

  const removeImage = useCallback(
    async (url) => {
      setPhotoId(url);
      if (photoId) {
        deleteImageFetch();
      }
    },
    [deleteImageFetch, photoId]
  );

  const handleClick = useCallback(() => {
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
                      <img src={require("../../assets/assets/left.png")}></img>
                    </button>
                    <img
                      className="pt-6"
                      src={require("../../assets/assets/Line.png")}
                    ></img>
                    <button className="flex flex-col py-2 items-center pt-2">
                      <img
                        onClick={handleOnOpen}
                        className="w-4 h-4 mx-16"
                        src={require("../../assets/assets/hamburger.png")}
                      />
                    </button>
                  </div>
                  <div className="flex flex-col min-h-full w-full justify-between">
                    <ObjectHeader objName={objName} fetch={fetchData} />
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
                                      value={objName}
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
                              {pictures?.length === 0 ? (
                                <>
                                  <div className="flex flex-col">
                                    <p className="text-xs h-6 text-gray-400 py-1"></p>
                                    <a>
                                      <div className="flex bg-white items-center justify-center rounded-lg shadow hover:drop-shadow-none drop-shadow h-32 overflow-hidden">
                                        <img
                                          className="flex bg-cover w-2/4 h-2/4"
                                          src={require("../../assets/assets/apple.png")}
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
                                          src={require("../../assets/assets/apple.png")}
                                        ></img>
                                      </div>
                                    </a>
                                  </div>
                                </>
                              ) : pictures?.length === 1 ? (
                                <div className="flex flex-col">
                                  <p className="text-xs h-6 text-gray-400 py-1"></p>
                                  <a>
                                    <div className="flex bg-white items-center justify-center rounded-lg shadow hover:drop-shadow-none drop-shadow h-32 overflow-hidden">
                                      <img
                                        className="flex bg-cover w-2/4 h-2/4"
                                        src={require("../../assets/assets/apple.png")}
                                      ></img>
                                    </div>
                                  </a>
                                </div>
                              ) : null}
                              {renderPhotos(pictures, imagesName)}
                              {/* {renderPhotos(objectPageImages, imagesName)} */}
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
                                  className="ml-8 h-8 w-6 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                                />
                                {/*  ml-4 self-start text-sm truncate my-2 */}
                                <p className="mr-8 ml-4 text-sm truncate">
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
                                    className="flex h-8 w-20 border text-black focus:outline-none pl-1 sm:text-sm"
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
                                    className="flex h-8 w-20 border text-black focus:outline-none pl-1 sm:text-sm"
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
                                    className="flex h-8 w-20 border text-black focus:outline-none pl-1 sm:text-sm"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-row items-center">
                                <input
                                  id="send-crew"
                                  name="send-crew"
                                  type="checkbox"
                                  className="ml-8 h-8 w-6 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
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
                                  className="ml-8 h-8 w-6 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
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
                                    className="flex w-32 ml-4 border h-8 border-gray-300 rounded-sm text-black focus:outline-none pl-1 sm:text-sm"
                                  />
                                </div>
                                <div className="flex flex-row items-center mt-6">
                                  <input
                                    id="control"
                                    name="control"
                                    type="checkbox"
                                    className="h-8 w-6 ml-4 text-gray-600  focus:ring-gray-500 rounded-sm"
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
                                      {obj?.obdindx}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Sutarties nr.
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      {obj?.contract}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Navision ID.
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      {obj?.navid}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Monas MS ID.
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      {obj?.monasid}
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
