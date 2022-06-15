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
  const closeFunc = useCallback(() => {
    setRemoveZone(true);
  }, [setRemoveZone]);

  return (
    <div className="flex flex-row items-center justify-between border-b h-12">
      <div className="bg-white w-full flex flex-row justify-between mx-4 text-gray-500 truncate text-sm ">
        <p className="text-gray-500">{name}</p>
        <button onClick={closeFunc} className="text-gray-300 text-xs hover:text-gray-400">Redaguoti</button>
      </div>
    </div>
  );
}

const DislocationSide = (props) => {
  const { accessToken } = useContext(AuthContext);
  const { english, lithuanian, t } = useLanguage();
  const { polygonsCoordinates, setPolygonsCoordinates} = useContext(GlobalContext);
  const { polygonsData, setPolygonsData } = useContext(GlobalContext);

  const crewZonesVariables = {
    updateCrewZones: {
    name: generate().toString(),
    nodes: polygonsCoordinates,
    }
  };

  const { error: errorResponse, data: mutateResponse, loading: loadingResponse, fetchData } = useFetch(
    crewZonesMutation,
    crewZonesVariables,
    accessToken
  );

  const createNewPolygon = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="flex flex-col">
        <div className="text-slate-400">
          <div className="flex justify-center mt-4">
            <Search />
          </div>
          {polygonsData?.crew_zone?.map((data) => (
          <AddressListItem name={data.name} nodes={data.nodes} crewid={data.crew_id} key={data.id}  />
          ))}
          <div className="flex justify-center mt-4">
            <div className="flex flex-row justify-center items-center pb-2">
              <img
                src={require("../../assets/assets/cross.png")}
                className="h-4 w-4 m-2"
              />
              <button onClick={createNewPolygon} className="text-gray-400 text-sm hover:text-gray-500">
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
