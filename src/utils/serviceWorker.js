import { Workbox } from "workbox-window";

export default function serviceWorker() {
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
}
