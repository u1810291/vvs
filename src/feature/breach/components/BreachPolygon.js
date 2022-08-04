import React, {memo} from 'react';

import {Polygon} from '@react-google-maps/api';

import {compareMemo} from 'util/react';

import {generate} from 'shortid';
import {map} from 'crocks/pointfree';

const BreachPolygon = memo(({zonePath}) => {
  const POLYGON_OPTIONS_BREACH = {
    strokeOpacity: 1,
    fillOpacity: 0.4,
    strokeWeight: 0.8,
    fillColor: '#F37E16',
    strokeColor: '#F37E16',
  };
  return (
    <>
      {map(nodes =>
        <Polygon
          key={generate()}
          paths={nodes}
          options={POLYGON_OPTIONS_BREACH}
        />,
        zonePath
      )}
    </>
  );
}, compareMemo(['zonePath']));

BreachPolygon.displayName = 'BreachPolygon';

export default BreachPolygon;
