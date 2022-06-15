import {SearchIcon} from "@heroicons/react/solid";
import {defaultProps} from "crocks";
import InputGroup from ".";
import useLanguage from "../../hook/useLanguage";

const SearchInputGroup = props => {
  const {t} = useLanguage();

  const p = defaultProps({
    placeholder: t('SearchInput.placeholder'),
    Addon: SearchIcon
  }, props);

  return <InputGroup {...p} />;
};

export default SearchInputGroup;
