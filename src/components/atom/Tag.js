const {withMergedClassName} = require('util/react');

const BlackTag = props => <span className='bg-black py-1 px-2 rounded-md text-white leading-none' {...props}/>;

export const CLASS_NAME = 'rounded-lg text-white leading-none';

const Tag = withMergedClassName(`${CLASS_NAME} px-3 py-1 text-base`, BlackTag);

Tag.Xs = withMergedClassName(`${CLASS_NAME} px-2 py-1 text-xs`, BlackTag);
Tag.Sm = withMergedClassName(`${CLASS_NAME} px-2 py-1 text-sm`, BlackTag);
Tag.Lg = withMergedClassName(`${CLASS_NAME} px-4 py-2 text-lg`, BlackTag);
Tag.Xl = withMergedClassName(`${CLASS_NAME} px-5 py-3 text-xl`, BlackTag);

export default Tag;
