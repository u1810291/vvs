import React from "react";
import useLanguage from "../../hook/useLanguage";

export const ObjectsList = ({ id, name, phone, email, address, icon, ...props }) => {
    const { english, lithuanian, t } = useLanguage();
    return (
      <div
        {...props}
        className="rounded-md w-full border sm:pb-2 p-2 mt-2 grid grid-cols-1 bg-white sm:grid-cols-5 justify-between font-normal text-black gap-2 z-1"
      >
        <div className="flex flex-row w-full">
          <span className="font-semibold bg-white self-center text-gray-500 block pr-2">
            {id}
          </span>
          <span className="flex bg-white  self-center">{name}</span>
        </div>
        <span className="flex bg-white text-gray-500 self-center">{phone}</span>
        <span className="flex bg-white text-gray-500 self-center">{email}</span>
        <span className="flex bg-white text-gray-500 self-center">{address}</span>
        <span className="flex bg-white justify-end self-center">{icon}</span>
      </div>
    )
};
