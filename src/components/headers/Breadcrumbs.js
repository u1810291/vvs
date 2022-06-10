import React from "react";

import {Link} from "react-router-dom";

import useLanguage from "../../hook/useLanguage";

const Breadcrumbs = ({
  titleText,
  subtitleText,
  titlePath,
  subtitlePath,
  twTitle,
  twSubtitle,
}) => {
  const {t} = useLanguage();
  return (
    <nav>
      <ol className={"flex"}>
        <li className={`text-lg text-gray-700 ${twTitle}`}>
          <Link to={titlePath}>
            {t(titleText)}
          </Link>
        </li>
        <li>
          <span className={"mx-4 text-lg text-gray-500"}> / </span>
        </li>
        <li className={`text-lg text-gray-500 ${twSubtitle}`}>
          <Link to={subtitlePath}>
            {t(subtitleText)}
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
