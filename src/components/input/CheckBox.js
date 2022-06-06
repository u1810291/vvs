import React, {useState, useEffect, useCallback} from "react";

import useDebounce from '../../hook/useDebounce';

const CheckBox = ({
  title,
  value,
  setValue,
  debounceDelay = 1000,
  isFetchable = false,
  isRequired = false,
  sideEffect = () => null,
  isLeft = false,
  twTitle,
  twBody,
  twCheckBox,
}) => {
  const [localValue, setLocalValue] = useState(false);

  const onChange = useCallback(event => {
    setLocalValue(!localValue);
    setValue(!localValue);
    if (isFetchable) affectDebounce(localValue, sideEffect, debounceDelay);
  }, [localValue]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div
      className={`cursor-pointer flex ${twBody}`}
      onClick={onChange}
      value={localValue}
    >
      <div className={`flex flex-row`}>
        <p className={`flex text-gray-800 ${twTitle} ${isLeft ? "order-1 mr-4" : "order-2 ml-4"}`}> {title} </p>
        <div className={`flex border border-gray-300 rounded-md h-8 w-8 items-center justify-center ${isLeft ? "order-2" : "order-1"}`}>
          {localValue && <div className={`bg-gray-400 rounded-sm h-4 w-4 ${twCheckBox}`} />}
        </div>
      </div>
    </div>
  );
};

export default CheckBox;