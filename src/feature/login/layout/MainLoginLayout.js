import MainLoginForm from '../form/MainLoginForm';

const MainLoginLayout = ({
  title = 'Sign in to your account',
  ...props
}) => (
  <div className='h-screen min-h-full bg-gray-50 dark:bg-gray-900'>
    <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-12 w-auto' src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg' alt='Workflow' />
        <h2 className='dark:text-gray-500 mt-6 text-center text-3xl font-extrabold text-gray-900'>{title}</h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <MainLoginForm/>
      </div>
    </div>
  </div>
);
export default MainLoginLayout;
