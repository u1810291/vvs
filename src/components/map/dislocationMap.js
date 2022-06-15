import React, { useCallback, useRef, useState, useContext } from "react";
import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import useLanguage from "../../hook/useLanguage";
import GoogleMapTools from "./googleMapTools";
import GlobalContext from "../../context/globalContext";
import { useQuery, useSubscription, useMutation } from "graphql-hooks";
import { crewZonesSubscription } from "../../api/queryForms/queryString/subscriptions";
import { generate } from "shortid";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapCenter = {
  lat: 55.95,
  lng: 23.33,
};

const paths = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
  { lat: 25.774, lng: -80.19 }
]

const options = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "red",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const lib = ["drawing"];

const DislocationMap = ({ mapTools }) => {
  const mapRef = useRef(null);
  const { english, lithuanian, t } = useLanguage();
  const [error, setError] = useState("");
  const { polygonsData, setPolygonsData } = useContext(GlobalContext);
  // console.log('polygonsData', polygonsData.crew_zone[1].nodes[0]);
  // console.log('polygonsData', polygonsData.crew_zone);

  useSubscription({ query: crewZonesSubscription }, ({ data, errors }) => {
    if (errors && errors.length > 0) {
      setError(errors[0]);
      return;
    }

    console.log("sbs ", data);
    setPolygonsData(data);
  });

  const onMapLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  const { isLoaded: isMapLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: lib,
  });

  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
const onLoad = (polygon) => {
    console.log("polygon: ", polygon);
  };

  const test = (map) => {
    console.log("polygon: ", map);
  };

  const asd = test(polygonsData);
  console.log('asd', asd);


  return isMapLoaded ? (
    <div className="w-full h-full relative">
      <GoogleMap
        zoom={14}
        center={mapCenter}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        mapContainerStyle={mapContainerStyle}
      >
        <GoogleMapTools onMapLoad={onMapLoad} />
        {/* {polygonsData.crew_zone?.map((polygon, index) => ( */}
          <Polygon
            onLoad={onLoad}
            paths={paths}
            options={options}
            key={generate()}
          />
        {/* ))} */}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(DislocationMap);
