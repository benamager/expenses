import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";

export default function RootLayout() {
  return (
    <div className="w-full">
      <NavBar />
      <main className="mb-[60px] flex flex-col mx-3">
        <Outlet />
      </main>
    </div>
  );
}
