import React, {useEffect, useMemo, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import Card from 'components/atom/Card';
import CheckBox from 'components/atom/input/CheckBox';
import InputGroup from 'components/atom/input/InputGroup';
import CalendarTimeline from 'components/CalendarTimeline/CalendarTimeline';
import {CrewListRoute} from 'feature/crew/routes';
import DynamicIcon from 'feature/crew/component/CrewIcon';
import {useCrew, useCrewZones, useCrewById} from 'feature/crew/api/crewEditApi';
import {getFlatNodesThroughCalendar, getZoneItemsThroughCalendar} from 'feature/breach/utils';
import {lengthGt} from 'util/pred';
import {
  getProp, safe, isTruthy, Maybe,
  isArray, map, option,  
} from 'crocks';
import {mapProps, pipe} from 'crocks/helpers';
import {differenceInMinutes} from 'date-fns';
import {useGoogleApiContext} from 'context/google';
import MapDislocationZone from 'feature/dislocation/component/MapDislocationZone';
import {GoogleMap} from '@react-google-maps/api';
import {INITIAL_COORDINATES} from 'feature/dislocation/form/DislocationEditForm';



const CrewEditLayout = ({saveRef, removeRef}) => {
  const {id: crewId} = useParams();
  const {data: crewZones} = useCrewZones();
  const {t} = useTranslation('crew', {keyPrefix: 'edit'});
  const {data: crew} = useCrewById(crewId);
  const {ctrl, result, setForm} = useResultForm({
    status: FORM_FIELD.TEXT({label: null, validator: () => true}),
    name: FORM_FIELD.TEXT({
      label: t`field.name`,
      message: t`validation.name`,
      showValidationBelow: true,
      validator: lengthGt(2)
    }),
    driver: FORM_FIELD.OBJECT({label: t`field.driver_name`, validator: () => true}),
    abbreviation: FORM_FIELD.TEXT({
      label: t`field.abbreviation`,
      message: t`validation.abbreviation`,
      showValidationBelow: true,
      validator: lengthGt(0)
    }),
    phone_number: FORM_FIELD.TEXT({label: t`field.phone_number`, validator: () => true}),
    to_call_after: FORM_FIELD.TEXT({initial: '10', label: t`field.to_call_after`, validator: () => true}),
    is_assigned_automatically: FORM_FIELD.BOOL({label: t`field.is_assigned_automatically`, validator: () => true}),
    is_assigned_while_in_breaks: FORM_FIELD.BOOL({label: t`field.is_assigned_while_in_breaks`, validator: () => true}),
    calendars: FORM_FIELD.EVENTS({label: t`field.events`, validator: () => true}),
    device_id: FORM_FIELD.TEXT({
      label: t`field.device_id`,
      message: t`validation.device_id`,
      showValidationBelow: true,
      validator: lengthGt(5)
    }),
  });

  useCrew({
    id: crewId,
    saveRef,
    setForm,
    removeRef,
    formResult: result,
    successRedirectPath: CrewListRoute.props.path,
  });

  const zonePath = getZoneItemsThroughCalendar(crew);
  const zoneCoordinates = getFlatNodesThroughCalendar(crew);

  // map
  const {isLoaded, mGoogleMaps} = useGoogleApiContext();
  const mapRef = useRef();
  const fitBoundsCounter = useRef(0);
  const mMap = useMemo(() => (
    isLoaded ? safe(isTruthy, mapRef.current) : Maybe.Nothing()
  ), [isLoaded, mapRef.current])

  useEffect(() => {
    Maybe.of(map => m => zoneLatLngs => {
      const bounds = new m.LatLngBounds();
      const newBounds = [...zoneLatLngs];

      if (zoneLatLngs.length == 0) {
        [...INITIAL_COORDINATES].forEach(latLng => bounds.extend(latLng));
        map.fitBounds(bounds);
        return;
      }
        
      if (newBounds.length <= fitBoundsCounter.current) {
        return;
      }

      newBounds.forEach(latLng => bounds.extend(latLng));
      map.fitBounds(bounds);
      fitBoundsCounter.current = newBounds.length;
    })
    .ap(mMap)
    .ap(mGoogleMaps)
    .ap(Maybe.of(zonePath.flat()))
    
  }, [zonePath, mGoogleMaps, mMap]);

  // form data
  const {value: name} = ctrl('name');
  const {value: status} = ctrl('status');
  const {value: driver} = ctrl('driver');

  const {firstName} = driver;
  const {lastName} = driver;
  
  // const remove = () => isFunction(removeRef.current) && removeRef.current([{crewId}]);

  useEffect(() => {
    pipe(
      getProp('calendars'),
      mapProps({calendars: Array})
    )(crew)
  }, [crew]);

  return (
    <section className={'m-6 h-full md:flex md:flex-row'}>
      <div className={'md:w-7/12 md:mr-6 xl:w-9/12 flex flex-col'}>
        <div className={'lg:flex 2xl:w-2/3'}>
          <InputGroup
            className={'mt-6 lg:mt-0 lg:w-5/12'}
            isRequired={true}
            {...ctrl('name')}
          />
          <InputGroup
            className={'mt-6 lg:mt-0 lg:ml-6 lg:mt-0 lg:w-2/12'}
            isRequired={true}
            {...ctrl('abbreviation')}
          />
          <InputGroup
            className={'mt-6 lg:mt-0 lg:ml-6 lg:mt-0 lg:w-5/12'}
            isRequired={true}
            {...ctrl('device_id')}
          />
        </div>
        <div className={'mt-6 2xl:w-2/3'}>
          <h2 className={'font-bold'}>
            {t`title.automatic_assignment`}
          </h2>
          <div className={'lg:flex'}>
            <CheckBox
              className={'px-0 mt-6 lg:mr-6 lg:mt-4 lg:flex lg:items-end lg:w-5/12'}
              {...ctrl('is_assigned_automatically')}
            />
            <InputGroup
              className={'mt-6 lg:mr-6 lg:mt-4 lg:w-4/12'}
              {...ctrl('phone_number')}
            />
            <InputGroup
              className={'mt-6 lg:mt-4 lg:w-3/12'}
              placeholder={'10'}
              {...ctrl('to_call_after')}
            />
          </div>
          <CheckBox
            className={'px-0 mt-6 lg:mt-4 lg:items-end'}
            {...ctrl('is_assigned_while_in_breaks')}
          />
        </div>
        <div className={'flex-1'}>
          <CalendarTimeline
            title={t('title.dislocation_zone_schedule')}
            actionButtonTitle={t('button.add_zone')}
            columnsTimeInterval={4}
            crewId={crewId}
            crewZones={crewZones || []}
            {...ctrl('calendars')}
          />
        </div>
      </div>
      <div className={'mt-6 flex flex-col w-full aspect-square lg:h-full md:w-5/12 md:mt-0 md:aspect-auto md:h-screen lg:h-auto lg:-mt-6 lg:-mb-6 lg:-mr-6 lg:-mb-6 xl:w-3/12'}>
        <Card.Sm className={'shadow-none'}>
          <div className='flex flex-row items-center w-full'>
            <DynamicIcon
              className={'mr-4'}
              status={differenceInMinutes(new Date(), new Date(driver.lastLoginInstant)) <= 60 ? 'ONLINE' : 'OFFLINE'}
              name={name}
            />
            <div className={'flex flex-col'}>
              <p className='text-bluewood'>
                {name}
              </p>
              <div className='flex'>
                <p className='text-regent mr-1'>
                  {firstName}
                </p>
                <p className='text-regent'>
                  {lastName}
                </p>
              </div>
            </div>
          </div>
        </Card.Sm>

        <div className='grow'>
          {isLoaded
            ? (
              <GoogleMap
                {...useMemo(() => ({
                  mapContainerStyle: {width: '100%', height: '100%'},
                  onLoad: map => {mapRef.current = map}
                }), [])}
              >
                {/* dislocation zones */}
                {
                  pipe(
                    safe(isArray),
                    map(map((path) => <MapDislocationZone 
                      key={`MapDislocationZone-${JSON.stringify(path)}`} 
                      zone={{id: JSON.stringify(path), nodes: path}} 
                    />)),
                    option(null),
                  )(zonePath)
                }
              </GoogleMap>
            ) : null
          }
        </div>
      </div>
    </section>
  );
};

export default CrewEditLayout;
