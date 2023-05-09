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
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/hooks/useAuth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <div className="container-fluid p-0 app-style">
            <App />
            <ToastContainer />
          </div>
        </AuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
