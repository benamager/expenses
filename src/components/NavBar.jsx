import { FaCreditCard, FaChartPie, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="fixed left-0 right-0 bottom-0 bg-slate-100">
      <ul className="flex justify-around mb-4 mt-1">
        <li>
          <Link to="/">
            <FaCreditCard size="25px" className="p-3 box-content" />
          </Link>
        </li>
        <li>
          <Link to="/stats">
            <FaChartPie size="25px" className="p-3 box-content" />
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaBars size="25px" className="p-3 box-content" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
