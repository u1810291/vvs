import React from 'react';

import {Marker as GoogleMarker} from '@react-google-maps/api';

import {generate} from 'shortid';
import {map} from 'crocks/pointfree';

const Marker = ({path, icon}) => (
  <>
    {map(map(
        nodes =>
          <GoogleMarker
            key={generate()}
            position={nodes}
            icon={icon}
          />
      ),
      path
    )}
  </>
);

export default Marker;
