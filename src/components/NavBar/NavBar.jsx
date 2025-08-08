import React, { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <div class="navbar-container">
        <div id="logo">Eventify</div>
        <nav>
          {/* if auth NavBar */}
          {user ? (
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/" onClick={handleSignOut}>
                  SIGN OUT
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/sign-in">SIGN IN</Link>
              </li>
              <li>
                <Link to="/sign-up">SIGN UP</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
