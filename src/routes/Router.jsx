import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Homepage from "@/pages/Homepage";
import Stats from "@/pages/Stats";
import Settings from "@/pages/Settings";

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
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
