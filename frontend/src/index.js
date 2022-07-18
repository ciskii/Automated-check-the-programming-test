import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { checkLoggedIn } from "features/auth/authSlice";

import { store } from "./app/store";
import App from "App";

const container = document.getElementById("root");
const root = createRoot(container);

// const {isLoggedIn}
store.dispatch(checkLoggedIn());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
