import {caseMap} from '@s-e/frontend/flow-control';
import {not, pipe, getProp, curry, map, option} from 'crocks';
import {constant} from 'lodash';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import Tag from 'components/atom/Tag';

const getStatus = curry(
  (
    isOnlineLens,
    isActiveLens,
    onUnknown,
    onInactive,
    onOnline,
    onOffline,
    props
  ) => caseMap(onUnknown, [
      [pipe(isActiveLens, map(Boolean), map(not), option(false)), onInactive],
      [pipe(isOnlineLens, map(Boolean), option(false)), onOnline],
      [pipe(isOnlineLens, map(Boolean), map(not), option(false)), onOffline],
    ], props)
);

const DriverOnlineTag = ({
  lens = {
    /**
     * @type {(obj: Object) => boolean}
     */
    isOnline: getProp('is_online'),

    /**
     * @type {(obj: Object) => boolean}
     */
    isActive: getProp('active')
  },
  classNames = {
    unknown: 'bg-gray-400',
    inactive: 'bg-gray-400',
    online: 'bg-mantis',
    offline: 'bg-brick',
  },
  Component = Tag,
  ...props
} = {}) => {
  const {t} = useTranslation('driver', {keyPrefix: 'onlineStatus'});

  const _getStatus = useMemo(() => getStatus(
    lens.isOnline,
    lens.isActive
  ), [lens.isActive, lens.isOnline]);

  const text = useMemo(() => pipe(
    _getStatus(
      constant('unknown'),
      constant('inactive'),
      constant('online'),
      constant('offline'),
    ),
    t
  )(props), [_getStatus, t]);

  const className = useMemo(() => pipe(
    _getStatus(
      constant(classNames.unknown),
      constant(classNames.inactive),
      constant(classNames.online),
      constant(classNames.offline),
    ),
    status => [status, props?.className].join(' '),
  )(props), [_getStatus, props, classNames]);


  return <Component className={className}>{text}</Component>;
};


export default DriverOnlineTag;
