import { FaCreditCard, FaChartPie, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  // hide the navbar on the expense page
  if (location.pathname === "/expense") {
    return null;
  }

  return (
    <nav className="fixed left-0 right-0 bottom-0 bg-slate-100 z-10">
      <ul className="flex justify-around mb-6 mt-1">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-black" : "text-slate-400")}>
            <FaCreditCard size="25px" className="p-3 box-content" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/stats" className={({ isActive }) => (isActive ? "text-black" : "text-slate-400")}>
            <FaChartPie size="25px" className="p-3 box-content" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "text-black" : "text-slate-400")}>
            <FaBars size="25px" className="p-3 box-content" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
