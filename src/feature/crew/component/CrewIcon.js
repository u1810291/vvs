import React from 'react';

import {getProp, safe} from 'crocks';
import {isString, propEq} from 'crocks/predicates';
import {caseMap} from '@s-e/frontend/flow-control';
import {withMergedClassName} from '../../../util/react';

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
CrewIcon.Offline = withMergedClassName(`${CLASS_NAME} border-loblolly`, CrewIconBase);

const DynamicIcon = caseMap(CrewIcon, [
  [is('BUSY'), CrewIcon.Busy],
  [is('BREAK'), CrewIcon.Break],
  [is('READY'), CrewIcon.Ready],
  [is('OFFLINE'), CrewIcon.Offline],
])

export default DynamicIcon;
