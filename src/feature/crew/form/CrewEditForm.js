import CalendarTimeline from 'components/CalendarTimeline/CalendarTimeline';
import Card from 'components/atom/Card';
import CheckBox from 'components/atom/input/CheckBox';
import DynamicIcon from 'feature/crew/component/CrewIcon';
import InputGroup from 'components/atom/input/InputGroup';
import Map from 'feature/map/component/Map';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import React, {useEffect} from 'react';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {Polygon} from '@react-google-maps/api';
import {useCrew, useCrewZones} from 'feature/crew/api/crewEditApi';
import {useNavigate, useParams} from 'react-router-dom';
import {useNotification} from 'feature/ui-notifications/context';
import {useTranslation} from 'react-i18next';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline';
import {CrewListRoute} from '../routes';

const polygonSetup = {
  strokeOpacity: 1,
  strokeWeight: 0.8,
  strokeColor: '#C32A2F',
  fillOpacity: 0.4,
  fillColor: '#C32A2F',
  clickable: true,
  draggable: true,
};

const polygon = [
  {lat: 55.95, lng: 23.3},
  {lat: 55.9, lng: 23.35},
  {lat: 55.85, lng: 23.3},];

const CrewEditLayout = ({saveRef}) => {
  const {id} = useParams();
  const {data, update, create} = useCrew(id);
  const swr = useCrewZones();
  const {t} = useTranslation('crew', {keyPrefix: 'edit'});
  const {ctrl, result, setForm} = useResultForm({
    status: FORM_FIELD.TEXT({label: null, validator: () => true}),
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    phone_number: FORM_FIELD.TEXT({label: t`field.phone_number`, validator: () => true}),
    to_call_after: FORM_FIELD.TEXT({label: t`field.to_call_after`, validator: () => true}),
    is_assigned_automatically: FORM_FIELD.BOOL({label: t`field.is_assigned_automatically`, validator: () => true}),
    is_assigned_while_in_breaks: FORM_FIELD.BOOL({label: t`field.is_assigned_while_in_breaks`, validator: () => true}),
    events: FORM_FIELD.EVENTS({label: t`field.events`, validator: () => true}),
    device_id: FORM_FIELD.TEXT({label: t`field.device_id`, validator: () => true}),
  });

  const {notify} = useNotification();
  const nav = useNavigate();

  useEffect(() => {
    saveRef.current = () => (id ? update(result) : create(result)).fork(
      error => notify(
        <NotificationSimple
          Icon={XCircleIcon}
          iconClassName={NOTIFICATION_ICON_CLASS_NAME.DANGER}
          heading={t`apiError`}
        >
          {JSON.stringify(error)}
        </NotificationSimple>
      ),
      () => {
        notify(
          <NotificationSimple
            Icon={CheckCircleIcon}
            iconClassName={NOTIFICATION_ICON_CLASS_NAME.SUCCESS}
            heading={t`success`}
          />
        );
        nav(CrewListRoute.props.path)
      }
    );
  }, [saveRef.current, result, t, nav, notify]);

  useEffect(() => {
    setForm(data);
  }, [data]);

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
          crewZones={swr.data || []}
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
        <Map>
          <Polygon path={polygon} options={polygonSetup} />
        </Map>
      </div>
    </section>
  );
};

export default CrewEditLayout;
