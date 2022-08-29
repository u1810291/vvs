import React from 'react';
import Tag, {CLASS_NAME} from 'components/atom/Tag';
import {caseMap} from '@s-e/frontend/flow-control';
import {getProp, safe, chain, option, isString, propEq} from 'crocks';
import {pipe} from 'crocks/helpers';
import {useTranslation} from 'react-i18next';
import {withMergedClassName} from 'util/react';

const is = propEq('status');

const CrewStatusBase = (props) => {
  const {t} = useTranslation(props?.t, {keyPrefix: 'list.status'});
  return (
    <Tag.Sm {...props}>
      {pipe(
        getProp('status'),
        chain(safe(isString)),
        option('-'),
        t,
      )(props)}
    </Tag.Sm>
  );
};

const CrewStatus = withMergedClassName(`${CLASS_NAME} text-black`, CrewStatusBase);
CrewStatus.Busy = withMergedClassName(`${CLASS_NAME} bg-burgundy`, CrewStatusBase);
CrewStatus.Break = withMergedClassName(`${CLASS_NAME} bg-tango`, CrewStatusBase);
CrewStatus.Ready = withMergedClassName(`${CLASS_NAME} bg-mantis`, CrewStatusBase);
CrewStatus.Offline = withMergedClassName(`${CLASS_NAME} bg-geyser text-black`, CrewStatusBase);
CrewStatus.DriveBack = withMergedClassName(`${CLASS_NAME} bg-mantis`, CrewStatusBase);

const DynamicStatus = caseMap(CrewStatus, [
  [is('BUSY'), CrewStatus.Busy],
  [is('BREAK'), CrewStatus.Break],
  [is('READY'), CrewStatus.Ready],
  [is('OFFLINE'), CrewStatus.Offline],
  [is('ASKED'), CrewStatus.Offline],
  [is('DRIVE_BACK'), CrewStatus.DriveBack],
]);

export default DynamicStatus;
