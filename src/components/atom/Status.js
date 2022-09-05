import React from 'react';

import {useTranslation} from 'react-i18next';

import {withMergedClassName} from 'util/react';

import Tag, {CLASS_NAME} from 'components/atom/Tag';

import {caseMap} from '@s-e/frontend/flow-control';

import {safe, getProp, propEq} from 'crocks';
import {pipe} from 'crocks/helpers';
import {isString} from 'crocks/predicates';
import {chain, option} from 'crocks/pointfree';

const is = propEq('status');

const StatusBase = (props) => {
  const {t} = useTranslation(props?.t, {keyPrefix: 'list.status'});
  return (
    <Tag.Sm {...props}>
      {pipe(
        getProp('status'),
        chain(safe(isString)),
        option('-'),
        t
      )(props)}
    </Tag.Sm>
  );
};

const Status = withMergedClassName(`${CLASS_NAME} text-black`, StatusBase);

// Crew
Status.Break = withMergedClassName(`${CLASS_NAME} bg-tango`, StatusBase);
Status.Ready = withMergedClassName(`${CLASS_NAME} bg-mantis`, StatusBase);
Status.Busy = withMergedClassName(`${CLASS_NAME} bg-burgundy`, StatusBase);
Status.DriveBack = withMergedClassName(`${CLASS_NAME} bg-mantis`, StatusBase);
Status.Offline = withMergedClassName(`${CLASS_NAME} bg-geyser text-black`, StatusBase);
// Task (Event)
Status.New = withMergedClassName(`${CLASS_NAME} bg-curious`, StatusBase);
Status.Finished = withMergedClassName(`${CLASS_NAME} bg-mantis`, StatusBase);
Status.OnTheRoad = withMergedClassName(`${CLASS_NAME} bg-brick`, StatusBase);
Status.Cancelled = withMergedClassName(`${CLASS_NAME} bg-oxford`, StatusBase);
Status.Inspection = withMergedClassName(`${CLASS_NAME} bg-brick`, StatusBase);
Status.InspectionDone = withMergedClassName(`${CLASS_NAME} bg-tango`, StatusBase);
Status.WaitForCrewApproval = withMergedClassName(`${CLASS_NAME} bg-tango`, StatusBase);

const DynamicStatus = caseMap(Status, [
  // Crew
  [is('BUSY'), Status.Busy],
  [is('BREAK'), Status.Break],
  [is('READY'), Status.Ready],
  [is('OFFLINE'), Status.Offline],
  [is('ASKED'), Status.Offline],
  [is('DRIVE_BACK'), Status.DriveBack],
  // Task (Event)
  [is('NEW'), Status.New],
  [is('INSPECTION'), Status.OnTheRoad],
  [is('ON_THE_ROAD'), Status.Cancelled],
  [is('FINISHED'), Status.InspectionDone],
  [is('INSPECTION_DONE'), Status.Inspection],
  [is('CANCELLED'), Status.WaitForCrewApproval],
  [is('WAIT_FOR_CREW_APPROVAL'), Status.Finished]
]);

export default DynamicStatus;
