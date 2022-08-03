import {XIcon} from '@heroicons/react/solid'

export const NOTIFICATION_ICON_CLASS_NAME = {
  NEUTRAL: 'text-gray-400 dark',
  DANGER: 'text-red-500',
  SUCCESS: 'text-green-500',
}

const NotificationSimple = ({Icon, iconClassName = NOTIFICATION_ICON_CLASS_NAME.NEUTRAL, heading, children}) => (
  <div className='max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
    <div className='p-4'>
      <div className='flex items-start'>
        {Icon && (
        <div className='flex-shrink-0 mr-3'>
          <Icon className={`h-6 w-6 ${iconClassName}`} aria-hidden='true' />
        </div>)}
        <div className='flex-1 pt-0.5'>
          <p className='text-sm font-medium text-gray-900'>{heading}</p>
          <p className='mt-1 text-sm text-gray-500'>{children}</p>
        </div>
        <div className='ml-4 flex-shrink-0 flex'>
          <button
            type='button'
            className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={() => {}}
          >
            <span className='sr-only'>Close</span>
            <XIcon className='h-5 w-5' aria-hidden='true' />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default NotificationSimple;
