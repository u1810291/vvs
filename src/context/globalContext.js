import { createContext, useState, useRef, useContext, useEffect } from "react";
import { generate } from "shortid";

const GlobalContext = createContext();

export default GlobalContext;

export const GlobalProvider = ({ children }) => {
  const dateRef = useRef();
  const objectRef = useRef();
  const nameRef = useRef();
  const crewRef = useRef();
  const inTimeRef = useRef();
  const reactionTimeRef = useRef();
  const statusRef = useRef();
  const reasonRef = useRef();
  const timeInObjectRef = useRef();

  const pdfExportComponentNew = useRef(null);
  const pdfExportComponentKey = useRef(null);
  const [filter, setFilter] = useState("");
  const [value, onChange] = useState(new Date());
  const [objectAddress, setObjectAddress] = useState("");
  const [edit, setEdit] = useState(false);
  const [savedToMenu, setSavedToMenu] = useState(false);
  const [savedToFavorite, setSavedToFavorite] = useState(false);
  const [longName, setLongName] = useState("");
  const [shortName, setShortName] = useState("");
  const [filterEditing, setFilterEditing] = useState(null);
  const [filterEditingDrivers, setFilterEditingDrivers] = useState(null);
  const [filterEditingClients, setFilterEditingClients] = useState(null);
  const [filterEditingObjects, setFilterEditingObjects] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [sortedDashboardTestApiKeys, setSortedDashboardTestApiKeys] =
    useState("");
  const [sortedDashboardTestApiOrder, setSortedDashboardTestApiOrder] =
    useState("");
  const [sortedClientsOrder, setSortedClientsOrder] = useState("");
  const [sortedClientsKeys, setSortedClientsKeys] = useState("");
  const [toPrintNew, setToPrintNew] = useState(null);
  const [toPrintKey, setToPrintKey] = useState(null);
  const [expandFilter, setExpandFilter] = useState(true);
  const [expandFilterDrivers, setExpandFilterDrivers] = useState(true);
  const [expandFilterObjects, setExpandFilterObjects] = useState(true);
  const [expandFilterClients, setExpandFilterClients] = useState(true);
  const [objectName, setObjectName] = useState("UAB 'Tigro šuolis' Pagalbai");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [apiData, setApiData] = useState("");
  const [globalToken, setGlobalToken] = useState("empty");
  const [objectDefault, setObjectDefault] = useState("default");
  const [nameDefault, setNameDefault] = useState("default");
  const [crewDefault, setCrewDefault] = useState("default");
  const [inTimeDefault, setInTimeDefault] = useState("default");
  const [reactionTimeDefault, setReactionTimeDefault] = useState("default");
  const [timeInObjectDefault, setTimeInObjectDefault] = useState("default");
  const [statusDefault, setStatusDefault] = useState("default");
  const [reasonDefault, setReasonDefault] = useState("default");
  const [dateDefault, setDateDefault] = useState("default");
  const [objectNamesDefault, setObjectNamesDefault] = useState("default");
  const [objectCityDefault, setObjectCityDefault] = useState("default");
  const [objectAddressDefault, setObjectAddressDefault] = useState("default");
  const [objectObjectsDefault, setObjectObjectsDefault] = useState("default");
  const [objectContractDefault, setObjectContractDefault] = useState("default");
  const [objectSentCrewDefault, setObjectSentCrewDefault] = useState("default");
  const [clientNamesDefault, setClientNamesDefault] = useState("default");
  const [clientContractsDefault, setClientContractsDefault] =
    useState("default");
  const [clientPhonesDefault, setClientPhonesDefault] = useState("default");
  const [clientEmailsDefault, setClientEmailsDefault] = useState("default");
  const [filterList, setFilterList] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: new Date().toISOString().split("T")[0],
      objectAddress: "",
      operator: "0",
      object: "0",
      type: "0",
      group: "0",
      status: "0",
      reason: "0",
      crew: "0",
      driver: "0",
      inTime: "0",
      dashboardList: [
        "Gauta",
        "Objektas",
        "Pavadinimas",
        "Ekipažas",
        "Spėjo laiku",
        "Reagavimo laikas",
        "Laikas objekte",
        "Būsena",
        "Suveikimo priežastis",
      ],
    },
  ]);
  const [selectedFilterDrivers, setSelectedFilterDrivers] = useState(null);
  const [filterListDrivers, setFilterListDrivers] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: new Date().toISOString().split("T")[0],
      objectAddress: "",
      operator: "0",
      object: "0",
      type: "0",
      group: "0",
      status: "0",
      reason: "0",
      crew: "0",
      driver: "0",
      inTime: "0",
      dashboardList: ["Vardas Pavardė", "Būsena"],
    },
  ]);

  const [selectedFilterClients, setSelectedFilterClients] = useState(null);
  const [filterListClients, setFilterListClients] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: new Date().toISOString().split("T")[0],
      objectAddress: "",
      operator: "0",
      object: "0",
      type: "0",
      group: "0",
      status: "0",
      reason: "0",
      crew: "0",
      driver: "0",
      inTime: "0",
      dashboardList: [
        "Vardas Pavardė",
        "Sutarties nr.",
        "Telefonas",
        "El. paštas",
      ],
    },
  ]);

  const [selectedFilterObjects, setSelectedFilterObjects] = useState(null);
  const [filterListObjects, setFilterListObjects] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: new Date().toISOString().split("T")[0],
      objectAddress: "",
      operator: "0",
      object: "0",
      type: "0",
      group: "0",
      status: "0",
      reason: "0",
      crew: "0",
      driver: "0",
      inTime: "0",
      dashboardList: [
        "Vardas Pavardė",
        "Miestas",
        "Adresas",
        "Objekto nr.",
        "Sutarties nr.",
        "Siusti ekipaža",
      ],
    },
  ]);

  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const contextData = {
    clientNamesDefault,
    setClientNamesDefault,
    clientContractsDefault,
    setClientContractsDefault,
    clientPhonesDefault,
    setClientPhonesDefault,
    clientEmailsDefault,
    setClientEmailsDefault,
    objectNamesDefault,
    setObjectNamesDefault,
    objectCityDefault,
    setObjectCityDefault,
    objectAddressDefault,
    setObjectAddressDefault,
    objectObjectsDefault,
    setObjectObjectsDefault,
    objectContractDefault,
    setObjectContractDefault,
    objectSentCrewDefault,
    setObjectSentCrewDefault,
    objectDefault,
    setObjectDefault,
    nameDefault,
    setNameDefault,
    crewDefault,
    setCrewDefault,
    inTimeDefault,
    setInTimeDefault,
    reactionTimeDefault,
    setReactionTimeDefault,
    timeInObjectDefault,
    setTimeInObjectDefault,
    statusDefault,
    setStatusDefault,
    reasonDefault,
    setReasonDefault,
    dateDefault,
    setDateDefault,
    globalToken,
    setGlobalToken,
    apiData,
    setApiData,
    filterEditingDrivers,
    setFilterEditingDrivers,
    filterEditingClients,
    setFilterEditingClients,
    filterEditingObjects,
    setFilterEditingObjects,
    expandFilter,
    setExpandFilter,
    objectName,
    setObjectName,
    pdfExportComponentNew,
    pdfExportComponentKey,
    toPrintNew,
    setToPrintNew,
    toPrintKey,
    setToPrintKey,
    filterList,
    setFilterList,
    selectedFilterDrivers,
    setSelectedFilterDrivers,
    filterListDrivers,
    setFilterListDrivers,
    selectedFilterClients,
    setSelectedFilterClients,
    filterListClients,
    setFilterListClients,
    selectedFilterObjects,
    setSelectedFilterObjects,
    filterListObjects,
    setFilterListObjects,
    value,
    onChange,
    objectAddress,
    setObjectAddress,
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
    filter,
    setFilter,
    filterEditing,
    setFilterEditing,
    selectedFilter,
    setSelectedFilter,
    currentFilter,
    setCurrentFilter,
    search,
    setSearch,
    sortedDashboardTestApiKeys,
    setSortedDashboardTestApiKeys,
    sortedDashboardTestApiOrder,
    setSortedDashboardTestApiOrder,
    sortedClientsOrder,
    setSortedClientsOrder,
    sortedClientsKeys,
    setSortedClientsKeys,
    expandFilterDrivers,
    setExpandFilterDrivers,
    expandFilterObjects,
    setExpandFilterObjects,
    expandFilterClients,
    setExpandFilterClients,
    dateRef,
    objectRef,
    nameRef,
    crewRef,
    inTimeRef,
    reactionTimeRef,
    statusRef,
    reasonRef,
    timeInObjectRef
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
};
