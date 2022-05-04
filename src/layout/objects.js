import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import useLanguage from "../hook/useLanguage";
import RegularSidebar from "../components/sidebars/regular";
import { ObjectsHeader } from "../components/headers/objects";
import { ObjectsList } from "../components/lists/objectsList";
const { AddFilterList } = require("../components/lists/addFilter");
import { Orders } from "../api/orders";
import { generate } from "shortid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Objects() {
  const { english, lithuanian, t } = useLanguage();
  const [sortedOrdersOrder, setSortedOrdersOrder] = useState("");
  const [sortedOrdersKeys, setSortedOrdersKeys] = useState("");

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

  function sortedOrdersNames() {
    if (sortedOrdersOrder === "") {
      setSortedOrdersKeys("name");
      setSortedOrdersOrder("asc");
    }
    if (sortedOrdersOrder === "asc") {
      setSortedOrdersKeys("name");
      setSortedOrdersOrder("desc");
    }
    if (sortedOrdersOrder === "desc") {
      setSortedOrdersKeys("name");
      setSortedOrdersOrder("");
    }
  }

  function sortedOrdersCity() {
    if (sortedOrdersOrder === "") {
      setSortedOrdersKeys("city");
      setSortedOrdersOrder("asc");
    }
    if (sortedOrdersOrder === "asc") {
      setSortedOrdersKeys("city");
      setSortedOrdersOrder("desc");
    }
    if (sortedOrdersOrder === "desc") {
      setSortedOrdersKeys("city");
      setSortedOrdersOrder("");
    }
  }

  function sortedOrdersAddress() {
    if (sortedOrdersOrder === "") {
      setSortedOrdersKeys("address");
      setSortedOrdersOrder("asc");
    }
    if (sortedOrdersOrder === "asc") {
      setSortedOrdersKeys("address");
      setSortedOrdersOrder("desc");
    }
    if (sortedOrdersOrder === "desc") {
      setSortedOrdersKeys("address");
      setSortedOrdersOrder("");
    }
  }

  function sortedOrdersObject() {
    if (sortedOrdersOrder === "") {
      setSortedOrdersKeys("object");
      setSortedOrdersOrder("asc");
    }
    if (sortedOrdersOrder === "asc") {
      setSortedOrdersKeys("object");
      setSortedOrdersOrder("desc");
    }
    if (sortedOrdersOrder === "desc") {
      setSortedOrdersKeys("object");
      setSortedOrdersOrder("");
    }
  }

  function sortedOrdersContract() {
    if (sortedOrdersOrder === "") {
      setSortedOrdersKeys("contract");
      setSortedOrdersOrder("asc");
    }
    if (sortedOrdersOrder === "asc") {
      setSortedOrdersKeys("contract");
      setSortedOrdersOrder("desc");
    }
    if (sortedOrdersOrder === "desc") {
      setSortedOrdersKeys("contract");
      setSortedOrdersOrder("");
    }
  }

  function sortedOrdersSentCrew() {
    if (sortedOrdersOrder === "") {
      setSortedOrdersKeys("sentCrew");
      setSortedOrdersOrder("asc");
    }
    if (sortedOrdersOrder === "asc") {
      setSortedOrdersKeys("sentCrew");
      setSortedOrdersOrder("desc");
    }
    if (sortedOrdersOrder === "desc") {
      setSortedOrdersKeys("sentCrew");
      setSortedOrdersOrder("");
    }
  }

  const sortedOrders = sortToggle(
    Orders,
    sortedOrdersKeys,
    sortedOrdersOrder
  );

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen relative overflow-hidden">
          <div className="flex flex-col h-screen items-center w-full ">
            <div className="flex flex-row w-full justify-between h-screen">
              <RegularSidebar />
              <div className="flex flex-col h-screen w-full justify-between">
                <ObjectsHeader />
                <div className="flex flex-col h-screen">
                  <div className="hidden pl-4 w-full border-t py-2 md:grid grid-cols-12 bg-gray-100 grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                    <div className="flex flex-row items-center col-span-2">
                      <button
                        onClick={sortedOrdersNames}
                        className="flex flex-row items-center"
                      >
                        <span className="text-gray-300 text-sm">
                          Vardas Pavardė
                        </span>
                        <img
                          src={require("../assets/assets/down.png")}
                          className="h-2 w-4 ml-2"
                        />
                      </button>
                    </div>
                    <button
                      onClick={sortedOrdersCity}
                      className="flex flex-row items-center"
                    >
                      <span className="text-gray-300 text-sm">Miestas</span>
                    </button>
                    <button
                      onClick={sortedOrdersAddress}
                      className="flex flex-row items-center col-span-3"
                    >
                      <span className="text-gray-300 text-sm">Adresas</span>
                    </button>
                    <button
                      onClick={sortedOrdersObject}
                      className="flex flex-row items-center"
                    >
                      <span className="text-gray-300 text-sm">Objekto nr.</span>
                    </button>
                    <button
                      onClick={sortedOrdersContract}
                      className="flex flex-row items-center"
                    >
                      <span className="text-gray-300 text-sm">Sutarties nr.</span>
                    </button>
                    <button
                      onClick={sortedOrdersSentCrew}
                      className="flex flex-row items-center"
                    >
                      <span className="text-gray-300 text-sm">Siusti ekipažą</span>
                    </button>
                  </div>
                  <div className="pl-4 flex-col w-full items-center scrollbar-gone overflow-y-auto h-screen">
                    {sortedOrders.map((data) => (
                      <ObjectsList
                        key={generate()}
                        name={data.name}
                        city={data.city}
                        address={data.address}
                        object={data.object}
                        contract={data.contract}
                        sentCrew={data.sentCrew}
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

export default Objects;
