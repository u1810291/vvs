import React from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import Card from 'components/atom/Card';
import Nullable from 'components/atom/Nullable';
import CheckBox from 'components/atom/input/CheckBox';
import InputGroup from 'components/atom/input/InputGroup';
import CalendarTimeline from 'components/CalendarTimeline/CalendarTimeline';

import Map from 'feature/map/component/Map';
import {CrewListRoute} from 'feature/crew/routes';
import Polygon from 'feature/map/component/Polygon';
import DynamicIcon from 'feature/crew/component/CrewIcon';
import {getFlatNodes, getZoneItems} from 'feature/breach/utils';
import {useCrew, useCrewById, useCrewZones} from 'feature/crew/api/crewEditApi';

import useResultForm, {FORM_FIELD} from 'hook/useResultForm';

const CrewEditLayout = ({saveRef}) => {
  const {id: crewId} = useParams();
  const {data: crewZones} = useCrewZones();
  const {t} = useTranslation('crew', {keyPrefix: 'edit'});
  const {data: crew} = useCrewById(crewId);
  const {ctrl, result, setForm} = useResultForm({
    status: FORM_FIELD.TEXT({label: null, validator: () => true}),
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    phone_number: FORM_FIELD.TEXT({label: t`field.phone_number`, validator: () => true}),
    to_call_after: FORM_FIELD.TEXT({label: t`field.to_call_after`, validator: () => true}),
    is_assigned_automatically: FORM_FIELD.BOOL({label: t`field.is_assigned_automatically`, validator: () => true}),
    is_assigned_while_in_breaks: FORM_FIELD.BOOL({label: t`field.is_assigned_while_in_breaks`, validator: () => true}),
    events: FORM_FIELD.EVENTS({label: t`field.events`, validator: () => true}),
    device_id: FORM_FIELD.TEXT({initial: '54:21:9D:08:38:8C', label: t`field.device_id`, validator: () => true}),
  });

  useCrew({
    id: crewId,
    saveRef,
    setForm,
    formResult: result,
    successRedirectPath: CrewListRoute.props.path,
  });

  const zonePath = getZoneItems(crew);
  const zoneCoordinates = getFlatNodes(crew);

  console.log(crewZones)

  return (
    <section className={'m-6 md:flex md:flex-row'}>
      <div className={'md:w-7/12 md:mr-6 xl:w-9/12'}>
        <div className={'lg:flex 2xl:w-2/3'}>
          <InputGroup
            className={'mt-6 lg:mt-0 lg:w-3/12'}
            isRequired={true}
            {...ctrl('name')}
          />
          <InputGroup
            className={'mt-6 lg:mt-0 lg:ml-6 lg:mt-0 lg:w-4/12'}
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
        <CalendarTimeline
          title={t('title.dislocation_zone_schedule')}
          actionButtonTitle={t('button.add_zone')}
          columnsTimeInterval={4}
          crewZones={crewZones || []}
          {...ctrl('events')}
        />
        <button className={'mt-6 py-4 w-full rounded-sm text-center bg-brick text-white lg:w-52 lg:mt-4'}>
          {t('button.delete')}
        </button>
      </div>
      <div className={'mt-6 flex flex-col w-full h-full aspect-square md:w-5/12 md:mt-0 md:aspect-auto md:h-screen lg:-mt-6 lg:-mr-6 lg:-mb-6 xl:w-3/12'}>
        <Card.Sm className={'shadow-none'}>
          <div className='flex flex-row items-center w-full'>
            <DynamicIcon
              className={'mr-4'}
              status={ctrl('status').value}
              name={ctrl('name').value}
            />
            <div className={'flex flex-col'}>
              <p className='text-bluewood'>
                {ctrl('name').value}
              </p>
              <p className='text-regent'>
                driver_name
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
