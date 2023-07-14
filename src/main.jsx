import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "@/routes/Router.jsx";
import serviceWorker from "@/utils/serviceWorker";

serviceWorker(); // register service worker

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
