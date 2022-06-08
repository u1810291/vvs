import React, {useCallback, useRef, useState, useEffect, useContext} from "react";
import AuthContext from "../../../context/authContext";
import {GoogleMap} from "@react-google-maps/api";
import Map from "../../../components/map/Map";
import Textarea from "../../../components/input/Textarea";
import Selectbox from "../../../components/input/Selectbox";
import ControlledInput from "../../../components/input/ControlledInput";
import {useFetch} from "../../../hook/useFetch";
import useLanguage from "../../../hook/useLanguage";
import {getCrewsQuery, getObjectsQuery} from "../../../api/queryForms/queryString/query";

const NewTaskForm = () => {
  const {t} = useLanguage();
  const {accessToken} = useContext(AuthContext);

  const {
    data: crewsResponse,
    error: crewsError,
    loading: isCrewsLoading,
    fetchData: fetchCrews
  } = useFetch(getCrewsQuery, null, accessToken);
  const {
    data: objectsResponse,
    error: objectsError,
    loading: isObjectsLoading,
    fetchData: fetchObjects
  } = useFetch(getObjectsQuery, null, accessToken);

  const [selectedCrew, setSelectedCrew] = useState();
  const [selectedObject, setSelectedObject] = useState();
  const [selectedTaskType, setSelectedTaskType] = useState();

  const [crews, setCrews] = useState([{}]);
  const [taskName, setTaskName] = useState("");
  const [objects, setObjects] = useState([{}]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTypes, setTaskTypes] = useState([{key: "Naujas", name: "Naujas"}]);

  useEffect(() => {
    fetchCrews();
    fetchObjects();
  }, []);

  useEffect(() => {
    if (crewsResponse && objectsResponse) {
      setCrews(crewsResponse.data.monas_crew_related.map(crew => ({
        key: crew.abbreviation,
        name: crew.id
      })));
      setObjects(objectsResponse.data.monas_test_objects.map(object => ({
        key: object.address,
        name: object.id
      })));
    }
  }, [crewsResponse, objectsResponse]);

  return (
    <section className={"flex flex-col w-1/4 p-5"}>
      <div className={"flex mb-6"}>
        <Selectbox
          title={t("eurocash.type")}
          value={taskTypes}
          setValue={setSelectedTaskType}
          selectedValue={selectedTaskType}
          isRequired={true}
          twSelect={"w-1/2 mr-4"}
        />
        <ControlledInput
          title={t("eurocash.name")}
          twBody={"mr-0 w-1/2"}
          isRequired={true}
          value={taskName}
          setValue={setTaskName}
        />
      </div>
      <Textarea
        title={t("eurocash.description")}
        value={taskDescription}
        setValue={setTaskDescription}
        rows={4}
        isRequired={true}
        twBody={"mb-6"}
      />
      <Selectbox
        title={t("eurocash.objectsAndAddresses")}
        value={objects}
        setValue={setSelectedObject}
        selectedValue={selectedObject}
        twSelect={"mb-6"}
      />
      <div className="relative h-80 mb-6">
        <Map/>
      </div>
      <Selectbox
        title={t("eurocash.crews")}
        value={crews}
        setValue={setSelectedCrew}
        selectedValue={selectedCrew}
        twSelect={"mb-6"}
      />
    </section>
  );
};

export default NewTaskForm;
