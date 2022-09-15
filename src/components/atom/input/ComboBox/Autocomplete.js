import ComboBox from '.';
import {map, pipe} from 'crocks';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {renderWithProps} from '../../../../util/react';
import {useDebounce} from 'hook/useDebounce';
import {useState} from 'react';

const Autocomplete = ({resultToOptionProps, onQuery, ...props}) => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('');

  useDebounce(() => {
    if (query) onQuery(query, setResult);
  }, 500, [query]);

  return (
    <ComboBox {...props} showAllOptions onKeyUp={onInputEventOrEmpty(setQuery)}>
      {map(pipe(
        resultToOptionProps,
        renderWithProps(ComboBox.Option),
      ), result)}
    </ComboBox>
  );
};

export default Autocomplete;
