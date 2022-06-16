import React from 'react';

const MarkerTag = ({label, description, labelTw, descriptionTw, bodyTw, labelBodyTw, descriptionBodyTw}) => {
  return (
    <div className={`flex text-sm font-thin rounded-md w-full h-6 ${bodyTw ? bodyTw : 'bg-white'}`}>
      <div className={`flex flex-row rounded-md truncate items-center px-2 ${labelBodyTw ? labelBodyTw : 'bg-black'}`}>
        <p className={`${labelTw ? labelTw : 'text-white'}`}>{label}</p>
      </div>
      {description && (
        <div className={`flex flex-row truncate items-center px-2 ${descriptionBodyTw ? descriptionBodyTw : 'bg-white'}`}>
          <p className={`${descriptionTw ? descriptionTw : 'text-black'}`}>{description}</p>
        </div>
      )}
    </div>
  );
};

export default MarkerTag;
