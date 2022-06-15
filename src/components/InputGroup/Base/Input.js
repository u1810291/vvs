import {defaultProps} from "crocks";

const Input = props => (
  <input
    {...defaultProps({
      type: 'text',
      className: 'focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md',
    }, props)}
  />
);

export default Input;
