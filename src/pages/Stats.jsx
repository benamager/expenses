import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <h1>Stats</h1>
      <Link to="/">Homepage</Link>
      <Link to="/stats">Stats</Link>
    </div>
  );
}
