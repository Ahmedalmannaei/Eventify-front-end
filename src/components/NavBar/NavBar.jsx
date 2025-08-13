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
      <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
        {/* Left: mobile menu + brand */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* if auth NavBar */}
            {/* Mobile menu (shows on small screens) */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow"
            >
              {user ? (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <details>
                      <summary>Events</summary>
                      <ul className="p-2">
                        <li>
                          <Link to="/new">Create Form</Link>
                        </li>
                        <li>
                          <Link to="/all">View Events</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <Link to="/" onClick={handleSignOut}>
                      Sign Out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/sign-in">Sign In</Link>
                  </li>
                  <li>
                    <Link to="/sign-up">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Brand */}
          <Link to="/" className="btn btn-ghost text-xl">
            Eventify
          </Link>
        </div>

        {/* Center: desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user ? (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <details>
                    <summary>Events</summary>
                    <ul className="p-2">
                      <li>
                        <Link to="/new">Create Event</Link>
                      </li>
                      <li>
                        <Link to="/all">View Events</Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            ) : null}
          </ul>
        </div>

        {/* Right: call-to-action / auth action */}
        <div className="navbar-end">
          {user ? (
            <button onClick={handleSignOut} className="btn btn-outline">
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/sign-up" className="btn">
                Sign Up
              </Link>
              <Link to="/sign-in" className="btn">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
