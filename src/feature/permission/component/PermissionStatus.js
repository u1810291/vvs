import React from 'react';
import {useTranslation} from 'react-i18next';
import {caseMap} from '@s-e/frontend/flow-control';
import {withMergedClassName} from 'util/react';
import {pipe} from 'crocks/helpers';
import {getProp, safe} from 'crocks';
import {chain, option} from 'crocks/pointfree';
import {isString, propEq} from 'crocks/predicates';

const is = propEq('status');

const PermissionStatusBase = (props) => {
  const {t} = useTranslation('permission', {keyPrefix: 'list.status'});
  return (
    <div className={'flex flex-col items-center justify-center rounded-md bg-white w-20 p-1 text-white text-xs font-normal'} {...props}>
      {t(`${pipe(getProp('status'), chain(safe(isString)), option('-'))(props)}`)}
    </div>
  );
};

const CLASS_NAME = 'flex flex-col items-start justify-center rounded-md w-20 p-1 text-white text-xs font-normal text-center';

const PermissionStatus = withMergedClassName(`${CLASS_NAME} bg-white text-black`, PermissionStatusBase);
PermissionStatus.Cancelled = withMergedClassName(`${CLASS_NAME} bg-burgundy`, PermissionStatusBase);
PermissionStatus.Rejected = withMergedClassName(`${CLASS_NAME} bg-tango`, PermissionStatusBase);
PermissionStatus.Complete = withMergedClassName(`${CLASS_NAME} bg-mantis`, PermissionStatusBase);
PermissionStatus.Asked = withMergedClassName(`${CLASS_NAME} bg-geyser`, PermissionStatusBase);
PermissionStatus.Allowed = withMergedClassName(`${CLASS_NAME} bg-cyan-500`, PermissionStatusBase);

const DynamicStatus = caseMap(PermissionStatus, [
  [is('CANCELLED'), PermissionStatus.Cancelled],
  [is('REJECTED'), PermissionStatus.Rejected],
  [is('PREREJECTED'), PermissionStatus.Rejected],
  [is('ALLOWED'), PermissionStatus.Allowed],
  [is('COMPLETE'), PermissionStatus.Complete],
  [is('ASKED'), PermissionStatus.Asked],

]);

export default DynamicStatus;
