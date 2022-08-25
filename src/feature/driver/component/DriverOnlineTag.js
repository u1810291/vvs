import {caseMap} from '@s-e/frontend/flow-control';
import {pipe, getProp, curry, option, isTrue, chain, safe, constant, isFalse, map} from 'crocks';
import Tag from 'components/atom/Tag';
import withPreparedProps from 'hoc/withPreparedProps';
import {useTranslation} from 'react-i18next';

const lensCase = (lens, pred) => pipe(
  lens,
  chain(safe(pred)),
  map(constant(true)),
  option(false)
);

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
      [lensCase(isActiveLens, isFalse), onInactive],
      [lensCase(isOnlineLens, isTrue), onOnline],
      [lensCase(isOnlineLens, isFalse), onOffline],
    ], props)
);

const UntranslatedDriverOnlineTag = ({
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
  getText = {
    unknown: constant('unknown'),
    inactive: constant('inactive'),
    online: constant('online'),
    offline: constant('offline'),
  },
  Component = Tag,
  ...props
} = {}) => {

  const _getStatus = getStatus(
    lens.isOnline,
    lens.isActive
  );

  const className = pipe(
    _getStatus(
      constant(classNames.offline),
      constant(classNames.inactive),
      constant(classNames.online),
      constant(classNames.offline),
    ),
    status => [status, props?.className].join(' '),
  )(props);

  return <Component className={className}>
    {pipe(
      _getStatus(
        getText.offline,
        getText.inactive,
        getText.online,
        getText.offline,
      ),
    )(props)}
  </Component>;
};

const DriverOnlineTag = withPreparedProps(UntranslatedDriverOnlineTag, () => {
  const {t} = useTranslation('driver', {keyPrefix: 'onlineStatus'});

  return {
    getText: {
      unknown: constant(t('unknown')),
      inactive: constant(t('inactive')),
      online: constant(t('online')),
      offline: constant(t('offline')),
    }
  };
});

DriverOnlineTag.Untranslated = UntranslatedDriverOnlineTag;

export default DriverOnlineTag;
