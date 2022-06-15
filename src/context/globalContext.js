import { createContext, useState, useRef, useContext, useEffect } from "react";
import { generate } from "shortid";

const GlobalContext = createContext();

export default GlobalContext;

export const GlobalProvider = ({ children }) => {
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
  const [filterEditingDrivers, setFilterEditingDrivers] = useState(null);
  const [filterEditingBreaches, setFilterEditingBreaches] = useState(null);
  const [filterEditingCrew, setFilterEditingCrew] = useState(null);
  const [filterEditingPermissions, setFilterEditingPermissions] =
    useState(null);
  const [filterEditingClients, setFilterEditingClients] = useState(null);
  const [filterEditingObjects, setFilterEditingObjects] = useState(null);
  const [filterEditingModems, setFilterEditingModems] = useState(null);
  const [filterEditingDislocations, setFilterEditingDislocations] =
    useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [sortedDashboardTestApiKeys, setSortedDashboardTestApiKeys] =
    useState("");
  const [sortedDashboardTestApiOrder, setSortedDashboardTestApiOrder] =
    useState("");
  const [toPrintNew, setToPrintNew] = useState(null);
  const [toPrintKey, setToPrintKey] = useState(null);
  const [expandFilter, setExpandFilter] = useState(true);
  const [expandFilterDrivers, setExpandFilterDrivers] = useState(true);
  const [expandFilterBreaches, setExpandFilterBreaches] = useState(true);
  const [expandFilterCrew, setExpandFilterCrew] = useState(true);
  const [expandFilterPermissions, setExpandFilterPermissions] = useState(true);
  const [expandFilterObjects, setExpandFilterObjects] = useState(true);
  const [expandFilterClients, setExpandFilterClients] = useState(true);
  const [expandFilterModems, setExpandFilterModems] = useState(true);
  const [objectName, setObjectName] = useState("UAB 'Tigro šuolis' Pagalbai");
  const [apiData, setApiData] = useState(""); // not used
  const [globalToken, setGlobalToken] = useState("empty");
  const [objectPageImages, setObjectPageImages] = useState([]);
  const [objectPageAddress, setObjectPageAddress] = useState("");
  const [objectPageFetchData, setObjectPageFetchData] = useState(false);
  const [removeZone, setRemoveZone] = useState(false);
  const [polygonsCoordinates, setPolygonsCoordinates] = useState([]);
  const [polygonsData, setPolygonsData] = useState([]);

  const [filterEditing, setFilterEditing] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterList, setFilterList] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: "",
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
      date: "",
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

  const [selectedFilterBreaches, setSelectedFilterBreaches] = useState(null);
  const [filterListBreaches, setFilterListBreaches] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: "",
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
      breachesList: [
        "Data nuo",
        "Laikas už zonos ribų",
        "Ekipažai",
        "Vairuotojai",
      ],
    },
  ]);

  const [selectedFilterDislocations, setSelectedFilterDislocations] =
    useState(null);
  const [filterListDislocations, setFilterListDislocations] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: "",
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
      dashboardList: ["Name"],
    },
  ]);

  const [selectedFilterCrew, setSelectedFilterCrew] = useState(null);
  const [filterListCrew, setFilterListCrew] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: "",
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
      crewList: [
        "Pavadinimas",
        "Trumpinys",
        "Dislokacijos zona",
        "Būsena",
        "Automatiškai priskirti",
      ],
    },
  ]);

  const [selectedFilterPermissions, setSelectedFilterPermissions] =
    useState(null);
  const [filterListPermissions, setFilterListPermissions] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: "",
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
      permissionsList: [
        "Date",
        "Pavadinimas",
        "Būsena",
        "Ekipažai",
        "Vairuotojai",
      ],
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
      date: "",
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
      date: "",
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
        "Pavadinimas",
        "Miestas",
        "Adresas",
        "Objekto nr.",
        "Sutarties nr.",
        "Siusti ekipaža",
      ],
    },
  ]);

  const [selectedFilterModems, setSelectedFilterModems] = useState(null);
  const [filterListModems, setFilterListModems] = useState([
    {
      id: generate(),
      filterName: generate(),
      filterShortName: Math.random().toString(36).slice(-4),
      savedToFavorite: true,
      savedToMenu: true,
      date: "",
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
        "Numeris",
        "Objekto Pavadinimas",
        "Objekto nr.",
        "Sutarties nr.",
        "Būsena",
      ],
    },
  ]);

  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const contextData = {
    polygonsData,
    setPolygonsData,
    polygonsCoordinates,
    setPolygonsCoordinates,
    removeZone,
    setRemoveZone,
    selectedFilterDislocations,
    setSelectedFilterDislocations,
    filterListDislocations,
    setFilterListDislocations,
    filterEditingDislocations,
    setFilterEditingDislocations,
    objectPageAddress,
    setObjectPageAddress,
    objectPageFetchData,
    setObjectPageFetchData,
    objectPageImages,
    setObjectPageImages,
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
    filterEditingModems,
    setFilterEditingModems,
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
    selectedFilterModems,
    setSelectedFilterModems,
    filterListModems,
    setFilterListModems,
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
    expandFilterDrivers,
    setExpandFilterDrivers,
    expandFilterObjects,
    setExpandFilterObjects,
    expandFilterClients,
    setExpandFilterClients,
    expandFilterModems,
    setExpandFilterModems,
    // breaches
    expandFilterBreaches,
    setExpandFilterBreaches,
    selectedFilterBreaches,
    setSelectedFilterBreaches,
    filterListBreaches,
    setFilterListBreaches,
    filterEditingBreaches,
    setFilterEditingBreaches,
    // crew
    expandFilterCrew,
    setExpandFilterCrew,
    selectedFilterCrew,
    setSelectedFilterCrew,
    filterListCrew,
    setFilterListCrew,
    filterEditingCrew,
    setFilterEditingCrew,
    // permissions
    expandFilterPermissions,
    setExpandFilterPermissions,
    selectedFilterPermissions,
    setSelectedFilterPermissions,
    filterListPermissions,
    setFilterListPermissions,
    filterEditingPermissions,
    setFilterEditingPermissions,
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
};
