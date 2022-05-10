import React, { useCallback } from "react";
import { Search } from "../../components/input/search";

export function KeysHeader() {

  const createKeys = useCallback(() => {
      console.log('create keys')
  },[])

  return (
    <div className="flex flex-row border-b h-16 bg-white justify-between">
      <div className="xl:flex hidden xl:flex-row ml-4 items-center">
        <p className="ml-2 mr-4 text-normal font-normal">Raktai</p>
        <Search />
      </div>
      <div className="flex flex-row items-center">
      <button
          onClick={createKeys}
          className="hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none"
        >
          Sukurti komplektą
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Objektai
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Modemai
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Raktai
        </button>
      </div>
    </div>
  );
}
