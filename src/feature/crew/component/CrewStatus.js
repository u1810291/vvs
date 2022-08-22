import React from 'react';

import {useTranslation} from 'react-i18next';

import {caseMap} from '@s-e/frontend/flow-control';

import {withMergedClassName} from 'util/react';

import {pipe} from 'crocks/helpers';
import {getProp, safe} from 'crocks';
import {chain, option} from 'crocks/pointfree';
import {isString, propEq} from 'crocks/predicates';

const is = propEq('status');

const CrewStatusBase = (props) => {
  const {t} = useTranslation('crew', {keyPrefix: 'list.status'});
  return (
    <div className={'flex flex-col items-center justify-center rounded-md bg-white min-w-20 w-fit p-1 text-white text-xs font-normal'} {...props}>
      {t(`${pipe(getProp('status'), chain(safe(isString)), option('-'))(props)}`)}
    </div>
  );
};

const CLASS_NAME = 'flex flex-col items-start justify-center rounded-md bg-white min-w-20 w-fit p-1 text-white text-xs font-normal';

const CrewStatus = withMergedClassName(`${CLASS_NAME} bg-white text-black`, CrewStatusBase);
CrewStatus.Busy = withMergedClassName(`${CLASS_NAME} bg-burgundy`, CrewStatusBase);
CrewStatus.Break = withMergedClassName(`${CLASS_NAME} bg-tango`, CrewStatusBase);
CrewStatus.Ready = withMergedClassName(`${CLASS_NAME} bg-mantis`, CrewStatusBase);
CrewStatus.Offline = withMergedClassName(`${CLASS_NAME} bg-geyser`, CrewStatusBase);
CrewStatus.DriveBack = withMergedClassName(`${CLASS_NAME} bg-mantis`, CrewStatusBase);

const DynamicStatus = caseMap(CrewStatus, [
  [is('BUSY'), CrewStatus.Busy],
  [is('BREAK'), CrewStatus.Break],
  [is('READY'), CrewStatus.Ready],
  [is('OFFLINE'), CrewStatus.Offline],
  [is('DRIVE_BACK'), CrewStatus.DriveBack],
]);

export default DynamicStatus;
