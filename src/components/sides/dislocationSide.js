import React, { useContext, useCallback, useState } from "react";
import useLanguage from "../../hook/useLanguage";
import { Search } from "../../components/input/search";
import GlobalContext from "../../context/globalContext";
import generate from "shortid";
import { crewZonesQuery } from "../../api/queryForms/queryString/query";
import { crewZonesSubscription } from "../../api/queryForms/queryString/subscriptions";
import { crewZonesMutation } from "../../api/queryForms/queryString/mutation";
import AuthContext from "../../context/authContext";
import useReactQuery from "../../hook/useQuery";
import { useFetch } from "../../hook/useFetch";
import { useQuery, useSubscription, useMutation } from "graphql-hooks";


const { ActiveCard } = require("../cards/active");

function AddressListItem({name, nodes, crewid, ...props}) {
  const {removeZone, setRemoveZone} = useContext(GlobalContext);
  const { polygonsData, setPolygonsData } = useContext(GlobalContext);
  const { addressCrew, setAddressCrew } = useContext(GlobalContext);
  const { polygonsCoordinates, setPolygonsCoordinates } =
  useContext(GlobalContext);
  const {polygonVisible, setPolygonVisible} = useContext(GlobalContext);
  const { individualPolygonsData, setIndividualPolygonsData } = useContext(GlobalContext);
  const { polygonsVisible, setPolygonsVisible } = useContext(GlobalContext);

  const closeFunc = useCallback(() => {
    setRemoveZone(true);
  }, [setRemoveZone]);


  return (
    <div className="flex flex-row items-center justify-between border-b h-12">
      <div className="bg-white w-full flex flex-row justify-between mx-4 text-gray-500 truncate text-sm ">
        <p className="text-gray-500">{name}</p>
        <button
          onClick={() => {
            setRemoveZone(true);
            const result = polygonsData?.find((x) => x.name === name);
            setAddressCrew(result.name);
            console.log('individualPolygonsData', individualPolygonsData);
            setIndividualPolygonsData(result.nodes);
            setPolygonsVisible(false);
            // setPolygonsCoordinates(result.nodes);
          }}
          className="text-gray-300 text-xs hover:text-gray-400"
        >
          Redaguoti
        </button>
      </div>
    </div>
  );
}

const DislocationSide = (props) => {
  // const { accessToken } = useContext(AuthContext);
  // const { english, lithuanian, t } = useLanguage();
  // const { polygonsCoordinates, setPolygonsCoordinates } =
  //   useContext(GlobalContext);
  const { polygonsData, setPolygonsData } = useContext(GlobalContext);
  const { setRemoveZone } = useContext(GlobalContext);
  const [polygonsMapData, setPolygonsMapData] = useState([]);
  const [ setError] = useState(null);

  const openFunc = useCallback(() => {
    setRemoveZone(true);
  }, [setRemoveZone]);

  useSubscription({ query: crewZonesSubscription }, ({ data, errors }) => {
    if (errors && errors.length > 0) {
      setError(errors[0]);
      return;
    }

    setPolygonsMapData(data);
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="text-slate-400">
          <div className="flex justify-center mt-4">
            <Search />
          </div>
          {polygonsMapData?.crew_zone?.map((data) => (
            <AddressListItem
              name={data.name}
              nodes={data.nodes}
              crewid={data.crew_id}
              key={data.id}
            />
          ))}
          <div className="flex justify-center mt-4">
            <div className="flex flex-row justify-center items-center pb-2">
              <img
                alt="plus"
                src={require("../../assets/assets/cross.png")}
                className="h-4 w-4 m-2"
              />
              <button
                onClick={openFunc}
                className="text-gray-400 text-sm hover:text-gray-500"
              >
                Sukurti zoną
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DislocationSide;
