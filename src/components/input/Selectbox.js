import React, {useState, useCallback, useEffect} from "react";

import {isEmpty} from "crocks";
import {generate} from "shortid";

import {ChevronDownIcon} from "@heroicons/react/outline";

const Selectbox = ({label, isRequired, items, value, setValue, twBody, twSelect, twRequired}) => {
  const onValueChangeHandler = useCallback(event => {
    setValue(items[+event.currentTarget.value]);
  }, [items, setValue]);

  return (
    <div className={`flex flex-col ${twBody}`}>
      <label className={" mb-2 text-gray-800"}>
        {label}
        {isRequired && <span className={`text-red-500 ${twRequired}`}> * </span>}
      </label>
      <div className={`relative`}>
        <ChevronDownIcon className={"absolute z-10 right-2 top-2 text-gray-300"} height={20} width={20} />
        <select
          className={`relative p-1 border border-gray-300 rounded-sm w-full appearance-none focus:outline-none text-gray-800 ${twSelect}`}
          onChange={onValueChangeHandler}
          value={items && value ? items.findIndex(item => value.key === item.key) : 0}
        >
          {items.map((item, index) => {
            const {value: name} = item;
            return <option key={generate()} value={index}> {name} </option>
          })}
        </select>
      </div>
    </div>
  );
};

export default Selectbox;
