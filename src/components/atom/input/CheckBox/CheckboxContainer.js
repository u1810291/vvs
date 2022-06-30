import React from 'react';
import {withMergedClassName} from '../../../../util/react';

export const CheckboxContainer = ({Tag = 'div', ...props}) => <Tag className='bg-transparent border-none relative flex items-start mb-6' {...props} />

export default withMergedClassName('bg-transparent border-none relative flex items-start', CheckboxContainer);
