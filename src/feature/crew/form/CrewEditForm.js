import React, {useEffect} from 'react';

import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import useResultForm, {FORM_FIELD} from 'hook/useResultForm';

import Button from 'components/Button';
import Card from 'components/atom/Card';
import Nullable from 'components/atom/Nullable';
import CheckBox from 'components/atom/input/CheckBox';
import InputGroup from 'components/atom/input/InputGroup';
import CalendarTimeline from 'components/CalendarTimeline/CalendarTimeline';

import Map from 'feature/map/component/Map';
import {CrewListRoute} from 'feature/crew/routes';
import Polygon from 'feature/map/component/Polygon';
import DynamicIcon from 'feature/crew/component/CrewIcon';
import {getFlatNodesThroughCalendar, getZoneItemsThroughCalendar} from 'feature/breach/utils';
import {useCrew, useCrewById, useCrewZones} from 'feature/crew/api/crewEditApi';

import {getProp, isFunction} from 'crocks';
import {mapProps, pipe} from 'crocks/helpers';

const CrewEditLayout = ({saveRef, removeRef}) => {
  const {id: crewId} = useParams();
  const {data: crewZones} = useCrewZones();
  const {t} = useTranslation('crew', {keyPrefix: 'edit'});
  const {data: crew} = useCrewById(crewId);
  const {ctrl, result, setForm} = useResultForm({
    status: FORM_FIELD.TEXT({label: null, validator: () => true}),
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    driver_name: FORM_FIELD.TEXT({label: t`field.driver_name`, validator: () => true}),
    abbreviation: FORM_FIELD.TEXT({label: t`field.abbreviation`, validator: () => true}),
    phone_number: FORM_FIELD.TEXT({label: t`field.phone_number`, validator: () => true}),
    to_call_after: FORM_FIELD.TEXT({label: t`field.to_call_after`, validator: () => true}),
    is_assigned_automatically: FORM_FIELD.BOOL({label: t`field.is_assigned_automatically`, validator: () => true}),
    is_assigned_while_in_breaks: FORM_FIELD.BOOL({label: t`field.is_assigned_while_in_breaks`, validator: () => true}),
    calendars: FORM_FIELD.EVENTS({label: t`field.events`, validator: () => true}),
    device_id: FORM_FIELD.TEXT({initial: '54:21:9D:08:38:8C', label: t`field.device_id`, validator: () => true}),
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

  const {value: name} = ctrl('name');
  const {value: status} = ctrl('status');
  const {value: driver_name} = ctrl('driver_name');

  const remove = () => isFunction(removeRef.current) && removeRef.current([{crewId}]);

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
        <Button.Dxl className={'flex-0 self-start'} onClick={remove}>{t('button.delete')}</Button.Dxl>
      </div>
      <div className={'mt-6 flex flex-col w-full aspect-square lg:h-full md:w-5/12 md:mt-0 md:aspect-auto md:h-screen lg:h-auto lg:-mt-6 lg:-mb-6 lg:-mr-6 lg:-mb-6 xl:w-3/12'}>
        <Card.Sm className={'shadow-none'}>
          <div className='flex flex-row items-center w-full'>
            <DynamicIcon
              className={'mr-4'}
              status={status}
              name={name}
            />
            <div className={'flex flex-col'}>
              <p className='text-bluewood'>
                {name}
              </p>
              <p className='text-regent'>
                {driver_name}
              </p>
            </div>
          </div>
        </Card.Sm>
        <Map
          zoom={12}
          path={zonePath}
          id={`crew-map-${crewId}`}
          coordinates={zoneCoordinates}
        >
          <Nullable on={zonePath}>
            <Polygon path={zonePath} />
          </Nullable>
        </Map>
      </div>
    </section>
  );
};

export default CrewEditLayout;
