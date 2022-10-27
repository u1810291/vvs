import React from 'react';

import {useTranslation} from 'react-i18next';

import {withMergedClassName} from 'util/react';

import Tag, {CLASS_NAME} from 'components/atom/Tag';

import {caseMap} from '@s-e/frontend/flow-control';

import {safe, getProp, propEq} from 'crocks';
import {pipe} from 'crocks/helpers';
import {isString} from 'crocks/predicates';
import {chain, option} from 'crocks/pointfree';
import {crewStatus as status, eventStatus, helpStatus, permissionStatus} from 'constants/statuses';

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
Status.DriveBack = withMergedClassName(`${CLASS_NAME} bg-tango`, StatusBase);
Status.Offline = withMergedClassName(`${CLASS_NAME} bg-geyser text-white`, StatusBase);
// Task (Event)
Status.New = withMergedClassName(`${CLASS_NAME} bg-curious`, StatusBase);
Status.Finished = withMergedClassName(`${CLASS_NAME} bg-mantis`, StatusBase);
Status.OnTheRoad = withMergedClassName(`${CLASS_NAME} bg-brick`, StatusBase);
Status.Cancelled = withMergedClassName(`${CLASS_NAME} bg-oxford`, StatusBase);
Status.CancelledByClient = withMergedClassName(`${CLASS_NAME} bg-oxford`, StatusBase);
Status.CancelledByCientConfirmed = withMergedClassName(`${CLASS_NAME} bg-oxford`, StatusBase);
Status.Inspection = withMergedClassName(`${CLASS_NAME} bg-brick`, StatusBase);
Status.InspectionDone = withMergedClassName(`${CLASS_NAME} bg-tango`, StatusBase);
Status.WaitForCrewApproval = withMergedClassName(`${CLASS_NAME} bg-tango`, StatusBase);

const DynamicStatus = caseMap(Status, [
  // Crew
  [is(status.CREW_LOGGED_OUT), Status.Offline],
  [is(status.CREW_BUSY), Status.Busy],
  [is(status.CREW_BREAK), Status.Break],
  [is(status.CREW_READY), Status.Ready],
  [is(status.CREW_OFFLINE), Status.Offline],
  [is(status.CREW_ASKED), Status.Offline],
  [is(status.CREW_DRIVE_BACK), Status.DriveBack],
  
  // Permissions
  [is(permissionStatus.PERMISSION_COMPLETE), Status.Finished],
  [is(permissionStatus.PERMISSION_ASKED), Status.Offline],
  [is(permissionStatus.PERMISSION_ALLOWED), Status.New],
  [is(permissionStatus.PERMISSION_REJECTED), Status.Break],
  [is(permissionStatus.PERMISSION_CANCELLED), Status.Busy],

  // Task (Event)
  [is(eventStatus.EVENT_NEW), Status.New],
  [is(eventStatus.EVENT_INSPECTION), Status.OnTheRoad],
  [is(eventStatus.EVENT_ON_THE_ROAD), Status.Cancelled],
  [is(eventStatus.EVENT_FINISHED), Status.InspectionDone],
  [is(eventStatus.EVENT_INSPECTION_DONE), Status.Inspection],
  [is(eventStatus.EVENT_CANCELLED), Status.WaitForCrewApproval],
  [is(eventStatus.EVENT_CANCELLED_BY_CLIENT), Status.CancelledByClient],
  [is(eventStatus.EVENT_CANCELLED_BY_CLIENT_CONFIRMED), Status.CancelledByCientConfirmed],
  [is(eventStatus.EVENT_WAIT_FOR_CREW_APPROVAL), Status.Finished],

  // Help
  [is(helpStatus.HELP_NEW), Status.New],
  [is(helpStatus.HELP_COMPLETED), Status.Finished],
]);

export default DynamicStatus;
