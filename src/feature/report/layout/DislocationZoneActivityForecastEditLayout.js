import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import SidebarLayout from 'layout/SideBarLayout';
import {Maybe, getProp, identity, isFunction, safe} from 'crocks';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {hasLength} from '@s-e/frontend/pred';
import {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useNotification} from 'feature/ui-notifications/context';
import {useAuth} from 'context/auth';
import useReport from 'feature/report/api/dislocation-zone-activity-forecast/useReport';
import {DislocationZoneActivityForecastListRoute} from '../routes';
import DislocationZoneActivityForecastForm from '../form/DislocationZoneActivityForecastForm';

const DislocationZoneActivityForecastEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data} = useReport({id});
  const {t} = useTranslation('report', {keyPrefix: 'dislocationZoneActivityForecast.edit'});
  const {t: tglobal} = useTranslation();
  const nav = useNavigate();
  const {notify} = useNotification();

  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };
  
  const auth = useAuth();

  const breadcrumb = (
    getProp('name', data)
    .chain(safe(hasLength))
    .alt(getProp('id', data).chain(safe(hasLength)))
    .alt(Maybe.Just(t('new')))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <Breadcrumbs.Item>
              <NavLink to={DislocationZoneActivityForecastListRoute.props.path}>
                {tglobal(DislocationZoneActivityForecastListRoute.props.translationKey, {ns: DislocationZoneActivityForecastListRoute.props.translationNs})}
              </NavLink>
            </Breadcrumbs.Item>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hideSlash>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(DislocationZoneActivityForecastListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>
      <DislocationZoneActivityForecastForm />
    </SidebarLayout>
  );
};
export default DislocationZoneActivityForecastEditLayout;
