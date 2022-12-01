import {isTruthy} from 'crocks';

const DateCell = ({
  formatted,
  isAvailable,
  isNow,
  isRangeEdge,
  isSelected,
  ...props
}) => (
  <button
    {...props}
    className={[
      'focus:outline-none rounded-md border border-gray-200 py-1',
      isAvailable ? null : 'opacity-20',
      isNow && !isSelected ? 'bg-gray-200' : null,
      isRangeEdge ? null : null,
      isSelected ? 'bg-gray-500' : null,
    ].filter(isTruthy).join(' ')}
  >
    <p className={[
      isAvailable ? null : null,
      isRangeEdge ? null : null,
      isSelected ? 'text-white' : null,
    ].filter(isTruthy).join(' ')}>{formatted}</p>
  </button>
);

export default DateCell;
