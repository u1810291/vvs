import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { DrawingManager } from "@react-google-maps/api";
import useLanguage from "../../hook/useLanguage";
import AuthContext from "../../context/authContext";
import GlobalContext from "../../context/globalContext";

const drawingManagerOptions = {
  drawingControl: true,
  drawingControlOptions: {
    drawingModes: ["polygon"],
    position: 3.0,
  },
  polygonOptions: {
    strokeOpacity: 1,
    strokeWeight: 0.8,
    strokeColor: "#C32A2F",
    fillOpacity: 0.4,
    fillColor: "#C32A2F",
    clickable: true,
    draggable: true,
  },
};

const GoogleMapTools = ({ onMapLoad }) => {
  const { accessToken } = useContext(AuthContext);
  const { polygonsCoordinates, setPolygonsCoordinates} = useContext(GlobalContext);
  const { english, lithuanian, t } = useLanguage();
  const [polygons, setPolygons] = useState([]);
  const drawingManager = useRef();

  const getCoordinates = useCallback(() => {
    const polygonsBounds = polygons.map((polygon) =>
      polygon.getPath().getArray()
    );
    const polygonsCoordinates = polygonsBounds.map((polygonBound) => {
      return polygonBound.map((polygonCoordinate) => ({
        lat: polygonCoordinate.lat(),
        lng: polygonCoordinate.lng(),
      }));
    });
    return polygonsCoordinates;
  }, [polygons]);

  let coordinates = getCoordinates();
  useEffect(() => {
    setPolygonsCoordinates(coordinates);
  }
  , [polygons]);

  const clearAllPolygons = useCallback(() => {
    if (polygons.length) {
      polygons.map((polygon) => polygon.setMap(null));
      setPolygons([]);
    }
  }, [polygons]);

  const undoPreviousPolygon = useCallback(() => {
    /*
      function to avoid direct state mutation
      e.g. to avoid pop, slice, shift, etc
      should control state only through setter
     */

    // returning only the last one or excludes last item from the list
    const getLastOrExcludeLast = (list, isOnlyLast) => {
      const lastItem = list[list.length - 1];
      return list.filter((item) => {
        if (isOnlyLast) {
          return item === lastItem;
        } else {
          return item !== lastItem;
        }
      });
    };

    if (polygons.length) {
      const veryLastPolygon = getLastOrExcludeLast(polygons, true);
      const allExceptLastPolygon = getLastOrExcludeLast(polygons);
      veryLastPolygon.forEach((polygon) => polygon.setMap(null));
      setPolygons([...allExceptLastPolygon]);
    }
  }, [polygons]);

  const deleteVertex = useCallback((polygon, vertex) => {
    const path = polygon.getPath();
    const mode = drawingManager.current.state.drawingManager.drawingMode;
    // mode === null means we are using an edit tool but not others like polygon, circle etc.
    if (mode === null && vertex != undefined && path.getLength() > 2) {
      path.removeAt(vertex);
    } else {
      return;
    }
  }, []);

  const onPolygonComplete = useCallback(
    (polygon) => {
      setPolygons([...polygons, polygon]);
      polygon.setEditable(true);
      polygon.addListener("rightclick", (event) => {
        deleteVertex(polygon, event.vertex);
      });
    },
    [polygons]
  );

  return (
    <>
      <button
        className="absolute z-1 top-24 border text-gray-900 text-sm rounded-sm shadow-md right-3 p-2 bg-white"
        onClick={clearAllPolygons}
      >
        {t("eurocash.clear")}
      </button>
      <button
        className="absolute z-1 top-36 border text-gray-900 text-sm rounded-sm shadow-md right-3 p-2 bg-white"
        onClick={undoPreviousPolygon}
      >
        {t("eurocash.undo")}
      </button>
      <DrawingManager
        onLoad={onMapLoad}
        ref={drawingManager}
        options={drawingManagerOptions}
        onPolygonComplete={onPolygonComplete}
      />
    </>
  );
};

export default GoogleMapTools;
