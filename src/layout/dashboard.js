import React, { useState, useCallback, useContext, useEffect } from "react";
import DashboardSideLeft from "../components/sides/dashboardLeft";
import DashboardSideRight from "../components/sides/dashboardRight";
import DashboardMap from "../components/map/dashboard";
import SlideOver from "../components/sidebars/slideOver";
import { OverlayProvider, usePreventScroll } from "react-aria";
import MainSidebar from "../components/sidebars/main";
import AuthContext from "../context/authContext";
import GlobalContext from "../context/globalContext";
const { OffCard } = require("../components/cards/off");
import { DDAPI } from "../api/dashboardDispatchApi";
import { useQuery, useSubscription, useMutation } from "graphql-hooks";

const test2 = `subscription ($invoices: String!, $objects: String!) {
  test (invoices: $invoices, objects: $objects) {
    id
    invoices
    objects
  }
  }
`;

const test = `
subscription {
  test {
    id
    invoices
    objects
  }
}
`;

// client.restartWebsocketConnection = () => {
//   if (wsLink) {
//     const { headers } = options;
//     if (typeof headers === 'function') {
//       wsLink.subscriptionClient.connectionParams = headers();
//     }
//     wsLink.subscriptionClient.tryReconnect();
//   }
// };

function Dashboard() {
  const { accessToken, user } = useContext(AuthContext);
  const { globalToken, setGlobalToken } = useContext(GlobalContext);
  const [offlineList, setOfflineList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOnOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const offlineListFunc = useCallback(() => {
    if (offlineList === false) {
      setOfflineList(true);
    }
    if (offlineList === true) {
      setOfflineList(false);
    }
  }, [offlineList]);

  usePreventScroll({ isDisabled: !isOpen });

  useEffect(() => {
    if (accessToken) {
      setGlobalToken(accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);

  // useSubscription({ query: test}, ({ data, errors }) => { // ,variables: { invoices: "invoices", objects: "objects" }
  //   if (errors && errors.length > 0) {
  //     setError(errors[0]);
  //     return;
  //   }

  //   console.log(data);
  //   setData(data);
  // });

  // if (error) {
  //   return <span>An error occurred {error.message}</span>;
  // }

  // if (data) {
  //   return <div>Current data: {data}</div>;
  // }

  return (
    <OverlayProvider>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
                <button className="flex flex-col items-center py-2">
                  <img
                    onClick={handleOnOpen}
                    className="w-4 h-4 mx-16"
                    src={require("../assets/assets/hamburger.png")}
                  />
                </button>
              </div>
              <div className="flex min-h-full overflow-y-auto scrollbar-gone flex-col w-2/4 bg-gray-100">
                <DashboardSideLeft />
              </div>
              {/* <DashboardMap /> */}
              <div className="flex flex-col h-screen justify-between w-2/4 bg-gray-100">
                <div className="flex flex-row py-4 bg-white items-center justify-between border-b">
                  <h4 className="ml-4 self-center text-md font-normal">
                    Ekipažai
                  </h4>
                </div>
                <div className="flex flex-col h-screen justify-between overflow-y-auto scrollbar-gone bg-gray-100">
                  <DashboardSideRight />
                </div>

                <div className="flex flex-col text-slate-400">
                  <div className="flex flex-row items-center justify-between border-t ml-6 py-2">
                    <button onClick={offlineListFunc} className="text-sm">Neprisijungę</button>
                    <button onClick={offlineListFunc} className="h-2 w-4 mr-10">
                      {offlineList ? (
                        <img src={require("../assets/assets/down.png")}></img>
                      ) : (
                        <img src={require("../assets/assets/up.png")}></img>
                      )}
                    </button>
                  </div>
                  {offlineList ? (
                    <div className="flex flex-col max-h-64 overflow-y-auto scrollbar-gone">
                      {DDAPI?.map((data) => (
                        <OffCard
                          id={data.id}
                          key={data.id}
                          crew={data.crew}
                          name={data.name}
                          status={data.status}
                          inBreak={data.inBreak}
                          inTask={data.inTask}
                          askForBreak={data.askForBreak}
                          connection={data.connection}
                          event={data.event}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <SlideOver isOpen={isOpen} onClose={handleOnClose}>
              <MainSidebar />
            </SlideOver>
          </div>
        </div>
      </div>
    </OverlayProvider>
  );
}

export default Dashboard;
