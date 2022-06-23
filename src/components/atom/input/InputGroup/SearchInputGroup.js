import {SearchIcon} from '@heroicons/react/solid';
import {defaultProps} from 'crocks';
import InputGroup from './index';
import useLanguage from '../../../../hook/useLanguage';

const SearchInputGroup = props => {
  const {t} = useLanguage();

  const p = defaultProps({
    placeholder: t('SearchInput.placeholder'),
    Addon: SearchIcon
  }, props);

  return (
    <InputGroup
      inputwrapperClassName='relative'
      inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full' {...p}
    />
  );
};

export default SearchInputGroup;
