import React from "react";

const CirclePointer = ({title, twTitle, twColor}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex rounded-full border-4 border-black bg-white w-8 h-8 text-black text-xs font-normal justify-center items-center">
        <p className="flex text-xs">{title}</p>
      </div>
    </div>
  );
};

export default CirclePointer;
