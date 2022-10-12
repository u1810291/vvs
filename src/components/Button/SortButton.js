import Nullable from 'components/atom/Nullable';

const {ChevronDownIcon, ChevronUpIcon} = require('@heroicons/react/solid')

const DIRECTION_ASC = 'asc';
const DIRECTION_DESC = 'desc';

export const SortButton = ({direction, children, isSortable}) => {
  return (
    <div className={`${isSortable ? 'cursor-pointer' : ''} flex space-x-4 jusitfy-center items-center w-fit text-sm font-normal text-gray-400 px-3 py-3 `}>
      {children}
      <Nullable on={direction === DIRECTION_ASC}>
        <ChevronDownIcon className='w-5 h-5 text-gray-400' />
      </Nullable>
      <Nullable on={direction === DIRECTION_DESC}>
        <ChevronUpIcon className='w-5 h-5 text-gray-400' />
      </Nullable>
    </div>
  )
}

export default SortButton;