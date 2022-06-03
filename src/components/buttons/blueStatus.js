import React from "react";
import useLanguage from '../../hook/useLanguage';

export function BlueStatus() {
  const { english, lithuanian, t } = useLanguage();
  return (
    <button className="flex justify-center self-center w-20 truncate rounded text-xs text-white hover:shadow-none bg-blue-600 focus:outline-none">
      {t("loginSystem.new")}
  </button>
  );
}
