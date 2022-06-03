import React, { useCallback, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import GlobalContext from "../../../context/globalContext";
import useLanguage from "../../../hook/useLanguage";

export function BreachHeader() {
  const { english, lithuanian, t } = useLanguage();

  return (
    <div className="flex flex-row border h-16 bg-white border-b-2 justify-between">
      <div className="xl:flex hidden xl:flex-row ml-4 items-center">
        <h4 className="text-lg ml-2 font-normal">
          {t("loginSystem.breach")}
        </h4>
        <p className="pl-2 text-gray-600">/</p>
        <h4 className="text-lg ml-2 hidden xxl:inline-block font-normal text-gray-500">
          {t("loginSystem.violations")}
        </h4>
      </div>
    </div>
  );
}
