import {Transition} from '@headlessui/react';
import {cloneElement, createContext, useCallback, useContext, useState} from 'react';

const NotificationContext = createContext();

const NotificationContextProvider = ({children}) => {
  const [data, setData] = useState([]);

  const notify = useCallback((children, {timeout = 800000} = {}) => {
    setData(d => {
      const notification = {
        id: `${d.length}-${+ new Date()}`,
        children,
        show: true,
        timeout,
      };

      setTimeout(() => {
        setData(d => d.map(d => d.id === notification.id ? ({...d, show: false}) : d))
      }, timeout)

      return [notification, ...d]
    });
  }, []);

  return (
    <NotificationContext.Provider value={{notify}}>
      {children}
      <div className='transition-all duration-1000 ease-in-out fixed top-0 left-0 right-0 pointer-events-none flex items-center flex-col z-10 my-16 mx-32'>
        {
          data.map((notification) => (
            <Transition
            appear
            key={notification.id}
            show={notification.show}
            className='my-4'
            enter='transition-all duration-300 ease-in-out transform'
            leave='transition-all duration-300 ease-in-out transform'
            enterFrom='-translate-y-full opacity-0 h-0'
            enterTo='translate-y-0 opacity-100'
            leaveFrom='translate-y-0 opacity-100 h-10'
            leaveTo='translate-y-full opacity-0 h-0'
          >
            {cloneElement(notification.children, {
              closeFn: () => setData(d => d.map(
                d => d.id === notification.id
                  ? ({...d, show: false})
                  : d
              ))
            })}
            </Transition>
          ))
        }
      </div>
    </NotificationContext.Provider>
  );
}

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }

  return context;
};

export {
  NotificationContextProvider,
  useNotification,
}
