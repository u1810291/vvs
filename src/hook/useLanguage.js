import { useCallback } from "react";
import { useTranslation } from "react-i18next";

function useLanguage() {

const { t, i18n } = useTranslation();

const changeLanguage = useCallback(
  async (language) => {
    i18n.changeLanguage(language);
  },
  [i18n]
);

const getLanguage = useCallback(
  () => {
    return i18n.resolvedLanguage;
  },
  [i18n],
);

const english = useCallback(
  async () => changeLanguage("en"),
  [changeLanguage]
);
const lithuanian = useCallback(
  async () => changeLanguage("lt"),
  [changeLanguage]
);

  return {english, lithuanian, getLanguage, t}
}

export default useLanguage;