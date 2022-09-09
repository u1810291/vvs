import React, {useEffect} from 'react';

import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {useGoogleApiContext} from 'context/google';

import useResultForm, {FORM_FIELD} from 'hook/useResultForm';

import Button from 'components/Button';
import Nullable from 'components/atom/Nullable';
import InputGroup from 'components/atom/input/InputGroup';

import Map from 'feature/map/component/Map';
import {DislocationListRoute} from 'feature/dislocation/routes';
import GoogleMapTools from 'feature/map/component/GoogleMapTools';
import {getFlatNodes, getZoneItems} from 'feature/dislocation/ultis';
import {useDisclocation} from 'feature/dislocation/api/dislocationEditApi';
import {isFunction} from 'crocks';
import {useSWRConfig} from 'swr'

const POLYGON_OPTIONS = {
  strokeOpacity: 1,
  fillOpacity: 0.4,
  strokeWeight: 0.8,
  fillColor: '#F37E16',
  strokeColor: '#F37E16',
  draggable: true
};

const DislocationEditForm = ({saveRef, removeRef}) => {
  const {id: dislocationZoneId} = useParams();
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

  useDisclocation({
    id: dislocationZoneId,
    formResult: result,
    saveRef,
    setForm,
    removeRef,
    successRedirectPath: DislocationListRoute.props.path,
  });

  const remove = () => isFunction(removeRef.current) && removeRef.current([{id: dislocationZoneId}]);

  return (
    <section className={'m-6 h-full flex md:flex-col lg:flex-row'}>
      <div className={'md:w-5/12 lg:w-3/12 mr-6 flex flex-col justify-between items-start'}>
        <InputGroup className={'w-2/3'} isRequired={true} {...ctrl('name')} />
        <Button.Dxl onClick={remove}>{t('button.delete')}</Button.Dxl>
      </div>
      <div className={'md:w-7/12 lg:w-9/12 -my-6 -mr-6'}>
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
      </div>
    </section>
  );
};

export default DislocationEditForm;
