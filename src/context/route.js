
const Contex = createContext();

const ContexProvider = memo(({children, ...props}) => {
  const [routes, setRoutes] = useReducer((older, newer) => ({...older, ...newer}), {});



  return (
    <Contex.Provider value={{routes, setRoutes}}>
      {children}
    </Contex.Provider>
  );
}, () => true);

const useRoute = () => {
  const context = useContext(Contex);
  if (context === undefined) throw new Error('useSetup must be used within a ContexProvider');
  return context;
}

export {
  ContexProvider,
  useRoute,
}

            // <Routes>
            //   <Route element={<ProtectedRoute />}>
            //     <Route path='/' exec element={<Login />} />
            //     <Route path='Dashboard' element={<Dashboard />} />
            //     <Route path='Keys' element={<Keys />} />
            //     <Route path='Tasks' element={<Tasks />} />
            //     <Route path='NewTask' element={<NewTaskLayout />} />
            //     <Route path='Drivers' element={<Drivers />} />
            //     <Route path='Clients' element={<Clients />} />
            //     <Route path='Objects' element={<Objects />} />
            //     <Route path='Modems' element={<Modems />} />
            //     <Route path='Create' element={<Create />} />
            //     <Route path='New' element={<New />} />
            //     <Route path='Driver/:id' element={<Driver />} />
            //     <Route path='Client/:id' element={<Client />} />
            //     <Route path='Modem/:id' element={<Modem />} />
            //     <Route path='Key/:id' element={<Key />} />
            //     <Route path='Object/:id' element={<Object />} />
            //     <Route path='Dislocation/:id' element={<Dislocations />} />
            //     <Route path='Dislocation/' element={<Dislocations />} />
            //     <Route path='CrewEditLayout/:id' element={<CrewEditLayout />} />
            //     <Route path='Crews' element={<Crews />} />
            //     <Route path='Permissions' element={<Permission />} />
            //     <Route path='PermissionConfirmation' element={<PermissionConfirmation />} />
            //     <Route path='Breaches' element={<Breaches />} />
            //     <Route path='Breach' element={<Breach />} />
            //     <Route path='*' element={<NotFound />} />
            //   </Route>
            // </Routes>
