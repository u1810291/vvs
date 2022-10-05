import React from 'react';

import InputGroup from './index';

import useLanguage from 'hook/useLanguage';

import {SearchIcon} from '@heroicons/react/solid';

import {defaultProps} from 'crocks';
import {withMergedClassName} from 'util/react';

const SearchInputGroup = props => {
  const {t} = useLanguage();

  const p = defaultProps({
    placeholder: t('SearchInput.placeholder'),
    Addon: SearchIcon
  }, props);

  return (
    <InputGroup
      inputwrapperClassName='relative'
      inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full' {...p}
    />
  );
};

export default withMergedClassName('focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full', SearchInputGroup);
