import React from 'react'
import {withMergedClassName} from 'util/react';

const Card = props => <div className='' {...props} />;

export default withMergedClassName(
  'bg-white dark:bg-zinc-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-opacity-80 dark:bg-opacity-80 backdrop-blur backdrop-filter',
  Card
);
