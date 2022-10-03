import React from 'react';

import {getProp, safe} from 'crocks';
import {withMergedClassName} from 'util/react';
import {isString, propEq} from 'crocks/predicates';
import {caseMap} from '@s-e/frontend/flow-control';
import {crewStatus as status, eventStatus} from 'constants/statuses';

const is = propEq('status');

const CrewIconBase = props => (
  <div className={'flex flex-col items-center justify-center rounded-full border-4 bg-white w-8 h-8 text-black text-xs font-normal'} {...props}>
    {getProp('name', props).chain(safe(isString)).map(e => e.slice(0, 1)).option('?')}
  </div>
);

const CLASS_NAME = 'flex flex-col items-center justify-center rounded-full border-4 bg-white w-8 h-8 text-black text-xs font-normal';

const CrewIcon = withMergedClassName(`${CLASS_NAME} border-black`, CrewIconBase);
CrewIcon.Busy = withMergedClassName(`${CLASS_NAME} border-brick`, CrewIconBase);
CrewIcon.Break = withMergedClassName(`${CLASS_NAME} border-tango`, CrewIconBase);
CrewIcon.Ready = withMergedClassName(`${CLASS_NAME} border-forest`, CrewIconBase);
CrewIcon.Offline = withMergedClassName(`${CLASS_NAME} border-gray`, CrewIconBase);
CrewIcon.DriveBack = withMergedClassName(`${CLASS_NAME} border-tango`, CrewIconBase);

const DynamicIcon = caseMap(CrewIcon, [
  // Crews
  [is(status.CREW_BUSY), CrewIcon.Busy],
  [is(status.CREW_BREAK), CrewIcon.Break],
  [is(status.CREW_READY), CrewIcon.Ready],
  [is(status.CREW_OFFLINE), CrewIcon.Offline],
  [is(status.CREW_DRIVE_BACK), CrewIcon.DriveBack],
  // Events
  [is(eventStatus.EVENT_NEW), CrewIcon.Busy],
  [is(eventStatus.EVENT_INSPECTION), CrewIcon.Busy],
  [is(eventStatus.EVENT_ON_THE_ROAD), CrewIcon.Busy],
  [is(eventStatus.EVENT_FINISHED), CrewIcon.Busy],
  [is(eventStatus.EVENT_INSPECTION_DONE), CrewIcon.Busy],
  [is(eventStatus.EVENT_CANCELLED), CrewIcon.Busy],
  [is(eventStatus.EVENT_WAIT_FOR_CREW_APPROVAL), CrewIcon.Busy],
  
])

export default DynamicIcon;
