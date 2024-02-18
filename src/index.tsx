import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ReduxProvider from "./components/redux/ReduxProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ReduxProvider>
    <App />
  </ReduxProvider>
);
