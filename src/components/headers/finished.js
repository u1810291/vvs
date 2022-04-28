import React, { useCallback, useContext, useState, useRef } from "react";
import GlobalContext from "../../context/globalContext";
import useLanguage from "../../hook/useLanguage";
import { GreenStatusTop } from "../buttons/greenStatusTop";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

export function FinishedHeader() {
  const { english, lithuanian, t } = useLanguage();

  return (
    <div className="flex flex-row border h-16 bg-white border-b-2 justify-between w-full">
      <div className="md:flex hidden md:flex-row ml-4 items-center">
        <h4 className="text-lg ml-2 font-normal">Užduotys</h4>
        <p className="pl-2 text-gray-600">/</p>
        <h4 className="text-lg ml-2  font-normal text-gray-500">
          Nauja užduotis
        </h4>
        <GreenStatusTop />
        <div className="flex flex-col justify-center items-end"></div>
      </div>
      <div className="flex flex-row items-center">
        <img
          className="h-8 w-6 mr-2 hidden lg:inline-block"
          src={require("../../assets/assets/doc.png")}
        ></img>
        <button
          // onClick={handleExportWithComponent}
          className="flex justify-center md:mr-6 p-1 text-normal font-normal"
        >
          Eksportuoti
        </button>
      </div>
    </div>
  );
}