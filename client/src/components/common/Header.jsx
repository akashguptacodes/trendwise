import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`px-4 py-2 hover:text-blue-500 transition ${
        location.pathname === to ? "text-blue-600 font-semibold" : "text-gray-700"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TrendWise
        </Link>
        <nav className="flex space-x-4">
          {navLink("/", "Home")}
          {navLink("/admin", "Admin")}
          {navLink("/login", "Login")}
        </nav>
      </div>
    </header>
  );
}

export default Header;