import React, { Suspense } from "react";
import { GlobalProvider } from "./context/globalContext";
import ReactDOM from "react-dom";
import "./assets/tailwind.css";
import App from "./App";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div></div>}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
