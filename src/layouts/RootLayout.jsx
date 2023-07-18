import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useLocation } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();

  return (
    <div className="w-full">
      <NavBar />
      <main className="mb-[80px] flex flex-col mx-3">
        <Outlet />
      </main>
    </div>
  );
}
