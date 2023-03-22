import React from "react";
import ReactDOM from "react-dom/client";

//styles
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "rsuite/dist/rsuite.min.css";

//components
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
