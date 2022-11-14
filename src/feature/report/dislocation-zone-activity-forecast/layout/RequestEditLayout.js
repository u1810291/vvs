import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import {
  Maybe,
  curry,
  hasProps,
  identity,
  isArray,
  isFunction,
  isTruthy,
  map,
  option,
  pipe,
  reduce,
  safe,
  tap,
} from 'crocks';
import SidebarLayout from 'layout/SideBarLayout';
import {useMemo, useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import useRequest from '../api/useRequest';
import RequestGraphs from '../component/RequestGraphs';
import RequestTables from '../component/RequestTables';
import RequestEditForm from '../form/RequestEditForm';
import RequestRoute, {DislocationZoneActivityForecastListRoute as RequestListRoute} from '../routes';
import {Circle, GoogleMap} from '@react-google-maps/api';
import {useGoogleApiContext} from 'context/google';
import {selectValueToObject} from '../utils';
import {AuthContextProvider} from '../context/auth';
import SpinnerGif from 'assets/assets/spinner.gif'

const INITIAL_COORDINATES = {lat: 55.2282442, lng: 24.2904923};

const safeListOf = curry((mGetter, list) => pipe(
  safe(isArray),
  map(reduce((carry, item) => (
    mGetter(item)
    .map(a => [...carry, a])
    .option(carry)
  ), [])),
)(list));

const RequestEditLayout = () => {
  const saveRef = useRef(identity);
  const params = useParams();
  const isCreated = isTruthy(params?.id);
  const request = useRequest(params);
  const {t} = useTranslation('request');
  const save = () => { isFunction(saveRef.current) && saveRef.current() };
  const breadcrumb = request?.data?.id || t`breadcrumbs.new`;
  const selectedLocations = request?.data?.locations?.map(selectValueToObject)
  const {isLoaded, mGoogleMaps} = useGoogleApiContext();
  const mapRef = useRef();

  const mMap = useMemo(() => (
    isLoaded ? safe(isTruthy, mapRef.current) : Maybe.Nothing()
  ), [isLoaded, mapRef.current])  

  useEffect(() => {
    Maybe.of(gmap => m => {
      const bounds = new m.LatLngBounds();
      safeListOf(pipe(
        safe(hasProps(['latitude', 'longitude'])),
        map(a => ({
          lat: a.latitude,
          lng: a.longitude,
        })),
        map(a => tap(bounds.extend(a))),
      ), selectedLocations);
      gmap.fitBounds(bounds);
    })
    .ap(mMap)
    .ap(mGoogleMaps)
  }, [mGoogleMaps, mMap]);

  const nav = useNavigate();

  // mutate before answer is loaded
  const timer = useRef();
  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      if (!isTruthy(request?.data?.answer)) {
        request.mutate();
      }    
    }, 1000);

    if (isTruthy(request?.data?.answer)) return () => clearTimeout(timer.current);

    return () => clearTimeout(timer.current);
  }, [request?.data]);

  return (
    <SidebarLayout>
      <Header>
        <Breadcrumbs>
          <RouteAsBreadcrumb route={RequestRoute} />
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hideSlash>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
        </Breadcrumbs>
        <div className='space-x-4'>
          <Button.Nd onClick={() => nav(RequestListRoute.props.path)}>{t(isCreated ? 'back' : 'cancel')}</Button.Nd>
          <Button className={isCreated && 'opacity-50'} disabled={isCreated} onClick={save}>{t`save`}</Button>
        </div>
      </Header>
      <div className='m-4'>
        <RequestEditForm saveRef={saveRef} />
        <Nullable on={isLoaded && request?.data?.id}>
          <GoogleMap
            {...useMemo(() => ({
              onLoad: map => mapRef.current = map,
              mapContainerStyle: {maxHeight: '70vh', width: '100%', height: '100%', marginTop: '2rem'},
              center: INITIAL_COORDINATES,
              zoom: 7.5,
            }))}
          >
            {pipe(
              safeListOf(pipe(
                safe(hasProps(['latitude', 'longitude'])),
                map(a => (
                  <Circle
                    key={Object.values(a).join(';')}
                    options={{
                      fillColor: '#ff0000',
                      strokeWeight: 0,
                    }}
                    radius={2000}
                    center={{
                      lat: a.latitude,
                      lng: a.longitude,
                    }}
                    />
                )),
              )),
              option(null),
            )(selectedLocations)}
          </GoogleMap>
        </Nullable>

        {/* Loader */}
        <Nullable on={isCreated && !request?.data?.answer}>
          <img src={SpinnerGif} />
        </Nullable>

        <RequestGraphs {...request} />
        <RequestTables {...request} />
      </div>
    </SidebarLayout>
  );
};

const AuthorizedRequestEditLayout = () => (
  <AuthContextProvider>
    <RequestEditLayout />
  </AuthContextProvider>
);

export default AuthorizedRequestEditLayout;
