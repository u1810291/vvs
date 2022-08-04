import React from 'react';

import {Marker} from '@react-google-maps/api';

import {generate} from 'shortid';
import {map} from 'crocks/pointfree';

const BreachMarker = ({breachPath}) => {
  const BREACH_PATH_ICON = {
    path: 'M 1, 1 1, 1',
    scale: 10,
    strokeColor: '#404B5F'
  };
  return (
    <>
      {map(map(
        nodes =>
          <Marker
            key={generate()}
            position={nodes}
            icon={BREACH_PATH_ICON}
          />
        ),
        breachPath
      )}
    </>
  );
};

export default BreachMarker;
