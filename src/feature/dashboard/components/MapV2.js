import React, {useEffect} from 'react';

import {useTranslation} from 'react-i18next';

import {useGoogleApiContext} from 'context/google';

import useResultForm, {FORM_FIELD} from 'hook/useResultForm';

import Nullable from 'components/atom/Nullable';

import Map from 'feature/map/component/Map';
import GoogleMapTools from 'feature/map/component/GoogleMapTools';
import {getFlatNodes, getZoneItems} from 'feature/dislocation/ultis';
import {useDisclocation} from 'feature/dislocation/api/dislocationEditApi';
import {useSWRConfig} from 'swr'

const POLYGON_OPTIONS = {
  strokeOpacity: 1,
  fillOpacity: 0.4,
  strokeWeight: 0.8,
  fillColor: '#F37E16',
  strokeColor: '#F37E16',
  draggable: false
};

const DislocationEditForm = ({saveRef, removeRef}) => {
  const dislocationZoneId = '1fddbd2b-cece-4737-b7ac-fb230aae6a4d';
  const {isLoaded, googleMap} = useGoogleApiContext();
  const {t} = useTranslation('dislocation', {keyPrefix: 'edit'});
  const {ctrl, result, setForm} = useResultForm({
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    nodes: FORM_FIELD.ARRAY({label: null, validator: () => true})
  });

  const {value: nodes} = ctrl('nodes');
  const zonePath = getZoneItems(nodes);
  const zoneCoordinates = getFlatNodes(nodes);

  const {cache} = useSWRConfig();

  useEffect(() => {
    cache.clear();
  }, [nodes]);

  console.log(ctrl('nodes'));
  useDisclocation({
    id: dislocationZoneId,
    formResult: result,
    saveRef,
    setForm,
    removeRef,
    successRedirectPath: null,
  });

  return (
    <Map
      zoom={14}
      path={zonePath}
      coordinates={zoneCoordinates}
      id={`dislocation-map-${dislocationZoneId}`}
    >
      <Nullable on={isLoaded}>
        <GoogleMapTools polygonsOptions={POLYGON_OPTIONS} {...ctrl('nodes')} drawingMode={'polygon'}/>
      </Nullable>
    </Map>
  );
};

export default DislocationEditForm;
