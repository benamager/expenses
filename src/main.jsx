import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Workbox } from "workbox-window";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");

    wb.addEventListener("activated", (event) => {
      if (!event.isUpdate) {
        console.log("Service worker has been installed for the first time!");
      } else {
        console.log("Service worker has been updated!");
      }
    });

    wb.register();
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
