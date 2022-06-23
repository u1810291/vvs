import React, {createContext, useMemo, useReducer} from 'react';

// FIXME: This is probably an obsolete context provider

const Context = createContext();

const ContexProvider = useMemo(({children, ...props}) => {
  const [routes, setRoutes] = useReducer((older, newer) => ({...older, ...newer}), {});

  return (
    <Context.Provider value={{routes, setRoutes}}>
      {children}
    </Context.Provider>
  );
}, () => true);

const useRoute = () => {
  const context = useContext(Contex);
  if (context === undefined) throw new Error('useRoute must be used within a ContextProvider');
  return context;
};

export {ContexProvider, useRoute};
