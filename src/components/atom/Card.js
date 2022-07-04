import React from 'react';
import {withMergedClassName} from 'util/react';

const div = props => <div {...props} />;

const CLASS_NAME = 'bg-white text-black dark:bg-zinc-900 shadow bg-opacity-80 dark:bg-opacity-80 backdrop-blur backdrop-filter';

const Card = withMergedClassName(`${CLASS_NAME} py-8 px-4 sm:px-10`, div);

Card.Sm = withMergedClassName(`${CLASS_NAME} py-4 px-2`, div);
Card.SmRounded = withMergedClassName(`${CLASS_NAME} py-4 px-2 sm:rounded-lg`, div);

export default Card;
