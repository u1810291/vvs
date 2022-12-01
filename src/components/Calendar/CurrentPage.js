import {useCalendar} from './Context';

const CurrentPage = () => {
  const {monthName, showMonthOf} = useCalendar();
  return (
    <div className='flex items-center justify-center min-w-36'>
      <p className='block text-base text-gray-800 capitalize'>{monthName}</p>
      <p className='block ml-2 text-base text-gray-800 capitalize'>{showMonthOf.getUTCFullYear()}</p>
    </div>
  );
};

export default CurrentPage;
