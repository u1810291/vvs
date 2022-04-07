import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

const GlobalContext = createContext();

export default GlobalContext;

export const GlobalProvider = ({ children }) => {
  const [filterList, setFilterList] = useState([
    {
      id: 1,
      filterName: "M1s20csdS1",
      filterShortName: "FAV1",
      savedToFavorite: true,
      savedToMenu: true,
      date: "2021-06-09 22:00",
      operator: "1",
      object: "1",
      objectAddress: "Some address",
      type: "1",
      group: "1",
      status: "1",
      reason: "1",
      crew: "1",
      driver: "1",
      inTime: "1",
      dashboardList: {
        id: 1,
        showDate: "Gauta",
        showObject: "Objektas",
        showName: "Pavadinimas",
        showCrew: "Ekipažas",
        showInTime: "spėjo laiku",
        showReactionTime: "Reagavimo laikas",
        showTimeInObject: "Laikas objekte",
        showStatus: "Būsena",
        showReason: "Suveikimo priežastis"
      }
    },
  ]);
  const [value, onChange] = useState(new Date());
  const [objectAddress, setObjectAddress] = useState("");
  const [operator, setOperator] = useState(0);
  const [object, setObject] = useState(0);
  const [type, setType] = useState(0);
  const [group, setGroup] = useState(0);
  const [status, setStatus] = useState(0);
  const [reason, setReason] = useState(0);
  const [crew, setCrew] = useState(0);
  const [driver, setDriver] = useState(0);
  const [inTime, setInTime] = useState(0);
  const [edit, setEdit] = useState(false);
  const [savedToMenu, setSavedToMenu] = useState(false);
  const [savedToFavorite, setSavedToFavorite] = useState(false);
  const [longName, setLongName] = useState("");
  const [shortName, setShortName] = useState("");
  const [showDate, setShowData] = useState(false);
  const [showObject, setShowObject] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showCrew, setShowCrew] = useState(false);
  const [showInTime, setShowInTime] = useState(false);
  const [showReactionTime, setShowReactionTime] = useState(false);
  const [showTimeInObject, setShowTimeInObject] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showReason, setShowReason] = useState(false);

  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const contextData = {
    filterList,
    setFilterList,
    value,
    onChange,
    objectAddress,
    setObjectAddress,
    operator,
    setOperator,
    object,
    setObject,
    type,
    setType,
    group,
    setGroup,
    status,
    setStatus,
    reason,
    setReason,
    crew,
    setCrew,
    driver,
    setDriver,
    inTime,
    setInTime,
    edit,
    setEdit,
    savedToMenu,
    setSavedToMenu,
    savedToFavorite,
    setSavedToFavorite,
    longName,
    setLongName,
    shortName,
    setShortName,
    showDate,
    setShowData,
    showObject,
    setShowObject,
    showName,
    setShowName,
    showCrew,
    setShowCrew,
    showInTime,
    setShowInTime,
    showReactionTime,
    setShowReactionTime,
    showTimeInObject,
    setShowTimeInObject,
    showStatus,
    setShowStatus,
    showReason,
    setShowReason,
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
};
