import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Homepage from "@/pages/Homepage";
import Stats from "@/pages/Stats";
import Settings from "@/pages/Settings";
import Expense from "@/pages/Expense";
import OldApp from "@/OldApp";

// object defined routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/expense",
        element: <Expense />,
      },
      {
        path: "/old",
        element: <OldApp />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
