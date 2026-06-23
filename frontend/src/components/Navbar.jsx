import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      <div className="container navbar-container">

        <Link to="/" className="logo">
          ⭐ ReviewHub
        </Link>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          {token && (
            <>
              <Link to="/cart">
                Cart
              </Link>

              <Link to="/orders">
                Orders
              </Link>

              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;