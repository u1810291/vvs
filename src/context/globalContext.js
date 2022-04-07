import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { generate } from "shortid";

const GlobalContext = createContext();

export default GlobalContext;

export const GlobalProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterList, setFilterList] = useState(
    [
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: false,
      savedToMenu: false,
      date: new Date().toISOString().split("T")[0],
      optionsList : {
        operator: "0",
        object: "0",
        objectAddress: "",
        type: "0",
        group: "0",
        status: "0",
        reason: "0",
        crew: "0",
        driver: "0",
        inTime: "0"
      },
      dashboardList: {
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
  ]
  );
  const [filter, setFilter] = useState("");
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
  const [filterEditing, setFilterEditing] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);

  // useEffect(() => {
  //   const temp = localStorage.getItem("filterList");
  //   const loadedFilters = JSON.parse(temp);

  //   if (loadedFilters) {
  //     setFilterList(loadedFilters);
  //   }
  // },[])

  // useEffect(() => {
  //   const temp = JSON.stringify(filterList);
  //   localStorage.setItem("filterList", temp);
  // }, [filterList])

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
    filter,
    setFilter,
    filterEditing,
    setFilterEditing,
    selectedFilter,
    setSelectedFilter,
    currentFilter,
    setCurrentFilter
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
};
