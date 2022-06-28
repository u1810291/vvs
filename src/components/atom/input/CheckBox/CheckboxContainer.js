import React from 'react';
import {withMergedClassName} from '../../../../util/react';

export const CheckboxContainer = ({Tag = 'div', ...props}) => <Tag className='relative flex items-start mb-6' {...props} />

export default withMergedClassName('relative flex items-start', CheckboxContainer);
