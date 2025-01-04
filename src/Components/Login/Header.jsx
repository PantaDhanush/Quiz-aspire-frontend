import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav>
        <div className="logo">
          <img src="logo.png" alt="logo" />
        </div>

        <div className="buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Sign up</button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Header;
