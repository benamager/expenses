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
          // After an update, the new service worker will take control immediately
          wb.messageSW({ type: "SKIP_WAITING" });
        }
      });

      // Listen for the controlling service worker changing and reload the page
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });

      wb.register();
    });
  }
}
