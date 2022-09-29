import React from 'react';

import {getProp, safe} from 'crocks';
import {withMergedClassName} from 'util/react';
import {isString, propEq} from 'crocks/predicates';
import {caseMap} from '@s-e/frontend/flow-control';
import {crewStatus as status} from 'constants/statuses';

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
CrewIcon.Offline = withMergedClassName(`${CLASS_NAME} border-brick`, CrewIconBase);
CrewIcon.DriveBack = withMergedClassName(`${CLASS_NAME} border-mantis`, CrewIconBase);

const DynamicIcon = caseMap(CrewIcon, [
  [is(status.CREW_BUSY), CrewIcon.Busy],
  [is(status.CREW_BREAK), CrewIcon.Break],
  [is(status.CREW_READY), CrewIcon.Ready],
  [is(status.CREW_OFFLINE), CrewIcon.Offline],
  [is(status.CREW_DRIVE_BACK), CrewIcon.DriveBack]
])

export default DynamicIcon;
