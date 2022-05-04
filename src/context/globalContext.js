import { createContext, useState, useRef } from "react";
import { generate } from "shortid";

const GlobalContext = createContext();

export default GlobalContext;

export const GlobalProvider = ({ children }) => {
  const pdfExportComponentNew = useRef(null);
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
  const [expandFilter, setExpandFilter] = useState(true);
  const [expandFilterDrivers, setExpandFilterDrivers] = useState(true);
  const [expandFilterObjects, setExpandFilterObjects] = useState(true);
  const [expandFilterClients, setExpandFilterClients] = useState(true);
  const [objectName, setObjectName] = useState("UAB 'Tigro šuolis' Pagalbai");
  const [selectedFilter, setSelectedFilter] = useState(null);
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
      dashboardList: [
        "Vardas Pavardė",
        "Būsena"
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
    toPrintNew,
    setToPrintNew,
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
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
};
