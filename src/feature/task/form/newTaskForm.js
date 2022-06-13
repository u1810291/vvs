import React, {useCallback, useState, useEffect, useContext} from "react";

import env from "../../../env";
import AuthContext from "../../../context/authContext";

import {identity, ifElse, or} from "crocks";
import Geocode from "react-geocode";
import resultToAsync from "crocks/Async/resultToAsync";
import {lengthGt, hasntLength} from "../../../util/pred";

import Map from "../../../components/map/Map";
import Textarea from "../../../components/input/Textarea";
import Selectbox from "../../../components/input/Selectbox";
import ControlledInput from "../../../components/input/ControlledInput";

import useAsync from "../../../hook/useAsync";
import useGeocode from "../../../hook/useGeocode";
import useLanguage from "../../../hook/useLanguage";
import useResultForm from "../../../hook/useResultForm";

import {asyncGetObjects, asyncGetCrews, asyncCreateEvent} from "../api/newTaskApi";
import {generate} from "shortid";

const NewTaskForm = () => {
  const {t} = useLanguage();
  const {getCoordsByAddress} = useGeocode();
  const {accessToken} = useContext(AuthContext);
  const [crews, setCrews] = useState([{}]);
  const [taskName, setTaskName] = useState("");
  const [objects, setObjects] = useState([
    {address: "Gilužio g. 5, Vilnius 06229, Lithuania"},
    {address: "Įsruties g. 3, Vilnius 06218, Lithuania"}
  ]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState([{key: "Naujas", value: "Naujas"}]);

  const [selectedCrew, setSelectedCrew] = useState();
  const [selectedObject, setSelectedObject] = useState();
  const [selectedTaskStatus, setSelectedTaskStatus] = useState();

  const inputGroupValidationProps = {
    isInvalid: ({isValid}) => !isValid,
    help: ({message}) => message,
  };

  const {
    isFullyComplete: isEventFullyComplete,
    ctrl: ctrlEvent,
    result: eventResult,
    directSet,
    form,
  } = useResultForm({
    secret: {
      initial: env.API_SECRET,
      validator: or(hasntLength, lengthGt(5)),
      message: t("validation.error.secret"),
      props: inputGroupValidationProps
    },
    token: {
      initial: `Bearer ${accessToken}`,
      validator: or(hasntLength, lengthGt(5)),
      message: t("validation.error.token"),
      props: inputGroupValidationProps
    },
    name: {
      initial: "",
      validator: or(hasntLength, lengthGt(5)),
      message: t("validation.error.taskName"),
      props: inputGroupValidationProps,
    },
    desctiption: {
      initial: "",
      validator: or(hasntLength, lengthGt(5)),
      message: t("validation.error.taskDescription"),
      props: inputGroupValidationProps,
    },
    status: {
      initial: "",
      validator: or(hasntLength, lengthGt(5)),
      message: t("validation.error.taskStatus"),
      props: inputGroupValidationProps,
    },
    crewID: {
      initial: "",
      validator: or(hasntLength, lengthGt(5)),
      message: t("validation.error.crewID"),
      props: inputGroupValidationProps,
    },
    objectID: {
      initial: "",
      validator: or(hasntLength, lengthGt(5)),
      message: t("validation.error.objectID"),
      props: inputGroupValidationProps,
    },
  });

  const [crewsResponse, forkCrews] = useAsync(
    asyncGetCrews("secret", accessToken),
    identity,
  );

  // const [objectsResponse, forkObjects] = useAsync(
  //   asyncGetObjects("secret", accessToken),
  //   identity,
  // );

  const [eventResponse, forkEvent] = useAsync(
    resultToAsync(eventResult).chain(asyncCreateEvent),
    identity,
  );

  useEffect(() => {
    forkCrews();
    // forkObjects();
  }, []);

  useEffect(() => {
    if (crewsResponse.data) {
      setCrews(crewsResponse.data.data.crews.map(crew => ({
        key: crew.Id,
        value: crew.abbreviation
      })));
    }
    // if (objectsResponse.data) {
    //   setObjects(objectsResponse.data.data.objects.map(object => ({
    //     key: object.Id,
    //     value: object.address
    //   })));
    // }
  }, [crewsResponse]);

  useEffect(async () => {
    if (objects) {
      const asyncMapObjects = await Promise.all(objects.map(async object => ({
        key: generate(),
        value: object.address,
        coords: await getCoordsByAddress(object.address)
      })));

      setObjects(await asyncMapObjects);
    }
  }, []);

  useEffect(() => {
    console.log(selectedObject)
  }, [selectedObject]);


  useEffect(() => {
    directSet("name", taskName);
    directSet("desctiption", taskDescription);
    directSet("status", selectedTaskStatus);
    directSet("crewID", selectedCrew);
    directSet("objectID", selectedObject);
  }, [taskName, taskDescription, selectedCrew, selectedObject, selectedTaskStatus]);

  return (
    <section className={"flex flex-col w-1/4 p-5"}>
      <div className={"flex mb-6"}>
        <Selectbox
          label={t("eurocash.type")}
          twBody={"w-1/2 mr-4"}
          isRequired={true}
          items={taskStatus}
          value={selectedTaskStatus}
          setValue={setSelectedTaskStatus}
        />
        <ControlledInput
          title={t("eurocash.name")}
          twBody={"mr-0 w-1/2"}
          isRequired={true}
          value={taskName}
          setValue={setTaskName}
          ctrlValue={ctrlEvent("name")}
        />
      </div>
      <Textarea
        title={t("eurocash.description")}
        twBody={"mb-6"}
        rows={4}
        isRequired={true}
        value={taskDescription}
        setValue={setTaskDescription}
      />
      <Selectbox
        label={t("eurocash.objectsAndAddresses")}
        twBody={"mb-6"}
        items={objects}
        value={selectedObject}
        setValue={setSelectedObject}
      />
      <div className="relative h-80 mb-6">
        <Map marker={selectedObject}/>
      </div>
      <Selectbox
        label={t("eurocash.crews")}
        twBody={"mb-6"}
        items={crews}
        value={selectedCrew}
        setValue={setSelectedCrew}
      />
    </section>
  );
};

export default NewTaskForm;
