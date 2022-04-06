import React, { useState, useCallback, useContext } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import GlobalContext from "../../context/globalContext";
import useLanguage from "../../hook/useLanguage";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const OptionsList = (props) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterList, setFilterList } = useContext(GlobalContext);
  const { value, onChange } = useContext(GlobalContext);
  const { objectAddress, setObjectAddress } = useContext(GlobalContext);
  const { operator, setOperator } = useContext(GlobalContext);
  const { object, setObject } = useContext(GlobalContext);
  const { type, setType } = useContext(GlobalContext);
  const { group, setGroup } = useContext(GlobalContext);
  const { status, setStatus } = useContext(GlobalContext);
  const { reason, setReason } = useContext(GlobalContext);
  const { crew, setCrew } = useContext(GlobalContext);
  const { driver, setDriver } = useContext(GlobalContext);
  const { inTime, setInTime } = useContext(GlobalContext);

  const operatorFunc = useCallback(async () => {
    setOperator(1);
  }, [setOperator]);

  const operatorFunc2 = useCallback(async () => {
    setOperator(2);
  }, [setOperator]);

  const objectFunc = useCallback(async () => {
    setObject(1);
  }, [setObject]);

  const objectFunc2 = useCallback(async () => {
    setObject(2);
  }, [setObject]);

  const handleAddress = useCallback(
    async (e) => {
      setObjectAddress(e.target.value);
    },
    [setObjectAddress]
  );

  const typeFunc = useCallback(async () => {
    setType(1);
  }, [setType]);

  const typeFunc2 = useCallback(async () => {
    setType(2);
  }, [setType]);

  const groupFunc = useCallback(async () => {
    setGroup(1);
  }, [setGroup]);

  const groupFunc2 = useCallback(async () => {
    setGroup(2);
  }, [setGroup]);

  const statusFunc = useCallback(async () => {
    setStatus(1);
  }, [setStatus]);

  const statusFunc2 = useCallback(async () => {
    setStatus(2);
  }, [setStatus]);

  const reasonFunc = useCallback(async () => {
    setReason(1);
  }, [setReason]);

  const reasonFunc2 = useCallback(async () => {
    setReason(2);
  }, [setReason]);

  const crewFunc = useCallback(async () => {
    setCrew(1);
  }, [setCrew]);

  const crewFunc2 = useCallback(async () => {
    setCrew(2);
  }, [setCrew]);

  const driverFunc = useCallback(async () => {
    setDriver(1);
  }, [setDriver]);

  const driverFunc2 = useCallback(async () => {
    setDriver(2);
  }, [setDriver]);

  const inTimeFunc = useCallback(async () => {
    setInTime(1);
  }, [setInTime]);

  const inTimeFunc2 = useCallback(async () => {
    setInTime(2);
  }, [setInTime]);

  return (
    <div
      {...props}
      className="w-full sm:pb-2 p-2 mt-2 grid grid-cols-1 bg-white sm:grid-cols-4 justify-between font-normal text-black gap-2 z-1"
    >
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col w-full">
          <p className="self-start text-sm text-gray-500 truncate">
            Data nuo - iki
          </p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">{value}</p>
            <div>
              <img src={require("../../assets/assets/calendar.png")}></img>
            </div>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <Calendar onChange={onChange} value={value} />
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">
            Operatorius
          </p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">
              {operator === 0
                ? "Any [Multiple choices]"
                : operator === 1
                ? "1"
                : "2"}
            </p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={operatorFunc}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    1
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={operatorFunc2}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">Objektas</p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">
              {object === 0
                ? "Any [Multiple choices]"
                : object === 1
                ? "1"
                : "2"}
            </p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={objectFunc}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    1
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={objectFunc2}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <div>
        <p className="self-start text-sm text-gray-500 truncate">
          Objekto adresas
        </p>
        <input
          id="search"
          name="search"
          placeholder=""
          onChange={handleAddress}
          value={objectAddress}
          className="flex w-full h-8 border-2 placeholder-gray-400 focus:outline-none sm:text-sm"
        />
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">Tipas</p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">
              {type === 0 ? "Any [Multiple choices]" : type === 1 ? "1" : "2"}
            </p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={typeFunc}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    1
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={typeFunc2}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">Grupė (?)</p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">
              {group === 0 ? "Any [Multiple choices]" : group === 1 ? "1" : "2"}
            </p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={groupFunc}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    1
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={groupFunc2}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">Statusas</p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">
              {status === 0
                ? "Any [Multiple choices]"
                : status === 1
                ? "1"
                : "2"}
            </p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={statusFunc}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    1
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={statusFunc2}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">
            Suveikimo priežastis
          </p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">
              {reason === 0
                ? "Any [Multiple choices]"
                : reason === 1
                ? "1"
                : "2"}
            </p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={reasonFunc}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    1
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={reasonFunc2}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">Ekipažas</p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">
              {crew === 0 ? "Any [Multiple choices]" : crew === 1 ? "1" : "2"}
            </p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={crewFunc}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    1
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={crewFunc2}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">
            Vairuotojas
          </p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">
              {driver === 0
                ? "Any [Multiple choices]"
                : driver === 1
                ? "1"
                : "2"}
            </p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={driverFunc}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    1
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={driverFunc2}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">
            Spėjo laiku (T/F)?
          </p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">
              {inTime === 0
                ? "Any [Multiple choices]"
                : inTime === 1
                ? "1"
                : "2"}
            </p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={inTimeFunc}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    1
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={inTimeFunc2}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full text-center"
                        : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
