import React, {memo} from 'react';

import {Polygon as GooglePolygon} from '@react-google-maps/api';

import {compareMemo} from 'util/react';

import {generate} from 'shortid';
import {map} from 'crocks/pointfree';

const POLYGON_OPTIONS = {
  strokeOpacity: 1,
  fillOpacity: 0.2,
  strokeWeight: 0.8,
  fillColor: '#F37E16',
  strokeColor: '#F37E16',
};

const Polygon = memo(({path, options = POLYGON_OPTIONS}) => (
  <>
    {map(nodes =>
        <GooglePolygon
          key={generate()}
          paths={nodes}
          options={options}
        />,
      path
    )}
  </>
), compareMemo(['path']));

Polygon.displayName = 'Polygon';

export default Polygon;
