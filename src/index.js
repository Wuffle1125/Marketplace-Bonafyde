import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import RootReducer from "./store";
import App from "./App";

import { GoogleOAuthProvider } from "@react-oauth/google";

import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

ReactDOM.render(
  <GoogleOAuthProvider clientId="235791262794-kl3ld1tqdn2aulasek0b8b7t3ji1ncs8.apps.googleusercontent.com">
    <Provider store={RootReducer}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
