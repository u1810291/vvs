import React, { useState, useCallback, useContext, useEffect } from "react";
import DashboardSideLeft from "../components/sides/dashboardLeft";
import DashboardSideRight from "../components/sides/dashboardRight";
import DashboardMap from "../components/map/dashboard";
import SlideOver from "../components/sidebars/slideOver";
import { OverlayProvider, usePreventScroll } from "react-aria";
import MainSidebar from "../components/sidebars/main";
import AuthContext from "../context/authContext";
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
  const { accessToken } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  usePreventScroll({ isDisabled: !isOpen });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useSubscription({ query: test }, ({ data, errors }) => { // ,variables: { invoices: "invoices", objects: "objects" }
    if (errors && errors.length > 0) {
      setError(errors[0]);
      return;
    }

    console.log(data);
    setData(data);
  });

  if (error) {
    return <span>An error occurred {error.message}</span>;
  }

  if (data) {
    return <div>Current data: {data}</div>;
  }

  return (
    <OverlayProvider>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
                <button className="flex flex-col items-center">
                  <img
                    onClick={handleOnClose}
                    className="w-4 h-4 mx-16"
                    src={require("../assets/assets/hamburger.png")}
                  />
                </button>
              </div>
              <div className="flex min-h-full overflow-y-auto scrollbar-gone flex-col w-2/4 bg-gray-100">
                <DashboardSideLeft />
              </div>
              <DashboardMap />
              <div className="flex flex-col h-screen justify-between overflow-y-auto scrollbar-gone w-2/4 bg-gray-100">
                <DashboardSideRight />
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
