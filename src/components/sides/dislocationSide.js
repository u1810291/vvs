import React from "react";
import useLanguage from "../../hook/useLanguage";
import { Search } from "../../components/input/search";
import { keys } from "../../api/keys";
import generate from "shortid";
const { ActiveCard } = require("../cards/active");

function AddressListItem() {
  return (
    <div className="flex flex-row items-center justify-between border-b h-12">
      <div className="bg-white w-full flex flex-row justify-between mx-4 text-gray-500 truncate text-sm ">
        <p className="text-gray-500">Marijampoles GRE</p>
        <button className="text-gray-300 text-xs hover:text-gray-400">Redaguoti</button>
      </div>
    </div>
  );
}

const DislocationSide = () => {
  const { english, lithuanian, t } = useLanguage();
  return (
    <>
      <div className="flex flex-col">
        <div className="text-slate-400">
          <div className="flex justify-center mt-4">
            <Search />
          </div>
          {keys?.map((data) => (
          <AddressListItem key={generate()} />
          ))}
          <div className="flex justify-center mt-4">
            <button className="flex flex-row justify-center items-center pb-2">
              <img
                src={require("../../assets/assets/cross.png")}
                className="h-4 w-4 m-2"
              />
              <p className="text-gray-400 text-sm hover:text-gray-500">
                Sukurti zoną
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DislocationSide;
