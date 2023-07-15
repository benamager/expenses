import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import serviceWorker from "@/utils/serviceWorker";
import App from "@/App";

serviceWorker(); // register service worker

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
