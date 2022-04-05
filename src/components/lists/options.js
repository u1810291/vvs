import React, { useState, useCallback } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import useLanguage from "../../hook/useLanguage";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const OptionsList = (props) => {
  const { english, lithuanian, t } = useLanguage();
  const [value, onChange] = useState();

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
            <p className="text-gray-400 self-center truncate">text</p>
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
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Paraiška
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Klientų aptarnavimas
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
            <p className="text-gray-400 self-center truncate">text</p>
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
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Paraiška
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Klientų aptarnavimas
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
          className="flex w-full h-8 border-2 placeholder-gray-400 focus:outline-none sm:text-sm"
        />
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <p className="self-start text-sm text-gray-500 truncate">Tipas</p>
          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
            <p className="text-gray-400 self-center truncate">text</p>
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
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Paraiška
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Klientų aptarnavimas
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
            <p className="text-gray-400 self-center truncate">text</p>
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
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Paraiška
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Klientų aptarnavimas
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
            <p className="text-gray-400 self-center truncate">text</p>
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
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Paraiška
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Klientų aptarnavimas
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
            <p className="text-gray-400 self-center truncate">text</p>
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
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Paraiška
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Klientų aptarnavimas
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
            <p className="text-gray-400 self-center truncate">text</p>
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
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Paraiška
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Klientų aptarnavimas
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
            <p className="text-gray-400 self-center truncate">text</p>
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
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Paraiška
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Klientų aptarnavimas
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
            <p className="text-gray-400 self-center truncate">text</p>
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
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Paraiška
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 w-full text-center" : "text-center w-full text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Klientų aptarnavimas
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
