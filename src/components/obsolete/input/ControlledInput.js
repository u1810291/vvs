import React, {useState, useEffect, useCallback} from 'react';

import useDebounce from '../../../hook/useDebounce';

const ControlledInput = ({
  title,
  value,
  setValue,
  placeholder,
  debounceDelay = 1000,
  isFetchable = false,
  isRequired = false,
  sideEffect = () => null,
  twBody,
  twTitle,
  twInput,
  twRequired,
}) => {
  const [localValue, setLocalValue] = useState('');
  const affectDebounce = (dep, fn, ms) => useDebounce(dep, fn, ms);
  /*
   debounce in case to fetch something,
   so if going to fetching anything
   by inputting a value (passing any sideEffect function),
   you just have to set isFetchable to true.
   still have posibility to change debounce delay value through prop.
*/
  const onChange = useCallback(event => {
    setLocalValue(event.target.value);
    setValue(event.target.value);
    if (isFetchable) affectDebounce(localValue, sideEffect, debounceDelay);
  }, [localValue]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className={`flex flex-col mr-4 ${twBody}`}>
      <label className={`text-gray-800 mb-2 ${twTitle}`}>
        {title}
        {isRequired && <span className={`text-red-500 ${twRequired}`}> * </span>}
      </label>
      <input
        className={`focus:outline-none text-gray-800 border border-gray-300 p-1 rounded-sm w-full ${twInput}`}
        value={localValue}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ControlledInput;
