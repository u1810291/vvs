import React, {useCallback} from "react";

import {Link, useNavigate} from "react-router-dom";

import useLanguage from "../../hook/useLanguage";

const MainHeader = ({

  children
}) => {
  const {t} = useLanguage();
  return (
    <header className={"flex items-center justify-between p-5 border-b border-gray-300"}>
      {children}
    </header>
  );
};

export default MainHeader;
