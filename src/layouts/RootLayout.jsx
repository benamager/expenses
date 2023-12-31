import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";

export default function RootLayout() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <NavBar />
      <main className="mb-[100px] flex flex-col mx-3">
        <Outlet />
      </main>
    </div>
  );
}
