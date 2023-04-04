import React from "react";
import ReactDOM from "react-dom/client";

//styles
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "rsuite/dist/rsuite.min.css";

import { Provider } from "react-redux";
import store from "./redux/store";

//components
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
