import React from "react";
import useLanguage from "../../../hook/useLanguage";
import { Link } from "react-router-dom";

export function DislocationHeader() {
  const { english, lithuanian, t } = useLanguage();

  return (
    <div className="flex flex-row border-b h-16 bg-white justify-between">
      <div className="xl:flex hidden xl:flex-row ml-4 items-center">
      <h4 className="ml-2 text-normal font-normal">Dislocation Zones</h4>
      </div>
      <div className="flex flex-row items-center">
        <button className="text-normal mx-1 sm:mx-6 h-full font-light hover:text-gray-500 text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Ekipažai
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light hover:text-gray-500 text-black border-b-4 mt-2 border-blue-400">
          Vairuotojai
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light hover:text-gray-500 text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Dislokacijos zonos
        </button>
        <Link to="/driver">
        <button
          className="hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none"
        >
          Sukurti zoną
        </button>
        </Link>
      </div>
    </div>
  );
}
