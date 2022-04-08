import {
  createContext,
  useState
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
        "Objektas",
        "Pavadinimas",
        "Ekipažas",
        "Spėjo laiku",
        "Reagavimo laikas",
        "Laikas objekte",
        "Būsena",
        "Suveikimo priežastis"
      ],
    },
  ]
  );
  const [filter, setFilter] = useState("");
  const [value, onChange] = useState(new Date());
  const [objectAddress, setObjectAddress] = useState("");
  const [edit, setEdit] = useState(false);
  const [savedToMenu, setSavedToMenu] = useState(false);
  const [savedToFavorite, setSavedToFavorite] = useState(false);
  const [longName, setLongName] = useState("");
  const [shortName, setShortName] = useState("");
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
    setCurrentFilter
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
};
