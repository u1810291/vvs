import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import useLanguage from "../hook/useLanguage";
import RegularSidebar from "../components/sidebars/regular";
import { ClientsListHeader } from "../components/headers/clientsList";
import { ClientList } from "../components/lists/clientsList";
const { AddFilterList } = require("../components/lists/addFilter");
import GlobalContext from "../context/globalContext";
import { Clients } from "../api/clients";
import { generate } from "shortid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ClientsList() {
  const { english, lithuanian, t } = useLanguage();
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);
  const [sortedClientsOrder, setSortedClientsOrder] = useState("");
  const [sortedClientsKeys, setSortedClientsKeys] = useState("");

  function sortToggle(arr, key, order) {
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    return arr.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      if (order === "asc") {
        return collator.compare(x, y);
      }
      if (order === "desc") {
        return collator.compare(x, y) * -1;
      }
      if (order === "") {
        return Math.random() - 0.5;
      }
    });
  }

  function sortedClientsNames() {
    if (sortedClientsOrder === "") {
      setSortedClientsKeys("name");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("name");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("name");
      setSortedClientsOrder("");
    }
  }

  function sortedClientsContracts() {
    if (sortedClientsOrder === "") {
      setSortedClientsKeys("contract");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("contract");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("contract");
      setSortedClientsOrder("");
    }
  }

  function sortedClientsPhones() {
    if (sortedClientsOrder === "") {
      setSortedClientsKeys("phone");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("phone");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("phone");
      setSortedClientsOrder("");
    }
  }

  function sortedClientsEmails() {
    if (sortedClientsOrder === "") {
      setSortedClientsKeys("email");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("email");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("email");
      setSortedClientsOrder("");
    }
  }

  const sortedClients = sortToggle(
    Clients,
    sortedClientsKeys,
    sortedClientsOrder
  );

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen relative overflow-hidden">
          <div className="flex flex-col h-screen items-center w-full ">
            <div className="flex flex-row w-full justify-between h-screen ">
              <RegularSidebar />
              <div className="flex flex-col h-screen w-full justify-between">
                <ClientsListHeader />
                <div className="flex flex-col h-screen">
                  <div className="hidden pl-4 w-full border-t py-2 md:grid grid-cols-12 bg-gray-100 grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                    <div className="flex flex-row items-center col-span-5">
                      <button
                        onClick={sortedClientsNames}
                        className="flex flex-row items-center"
                      >
                        <span className="text-gray-300 col-span-4 text-sm">
                          Vardas Pavardė
                        </span>
                        <img
                          src={require("../assets/assets/down.png")}
                          className="h-2 w-4 ml-2"
                        />
                      </button>
                    </div>
                    <button
                      onClick={sortedClientsContracts}
                      className="flex flex-row items-center"
                    >
                      <span className="text-gray-300 text-sm">Sutarties nr.</span>
                    </button>
                    <button
                      onClick={sortedClientsPhones}
                      className="flex flex-row items-center"
                    >
                      <span className="text-gray-300 text-sm">Telefonas</span>
                    </button>
                    <button
                      onClick={sortedClientsEmails}
                      className="flex flex-row items-center"
                    >
                      <span className="text-gray-300 col-span-5 text-sm">El. paštas</span>
                    </button>
                  </div>
                  <div className="pl-4 flex-col w-full items-center scrollbar-gone overflow-y-auto h-screen">
                    {sortedClients.map((data) => (
                      <ClientList
                        key={generate()}
                        name={data.name}
                        contract={data.contract}
                        phone={data.phone}
                        email={data.email}
                      />
                    ))}
                    <nav className="border-gray-200 flex items-center justify-between mt-4 sm:px-4 w-full bg-white"></nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientsList;
