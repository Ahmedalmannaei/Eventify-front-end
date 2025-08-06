import React, { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      {/* if auth NavBar */}
      {/* {user ? ( */}
      {/* <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/hoots'>HOOTS</Link></li>
          <li><Link to='/hoots/new'>NEW HOOT</Link></li>
          <li><Link to='/' onClick={handleSignOut}>SIGN OUT</Link></li>
        </ul> */}
      {/* ) : ( */}
      <ul>
        <li>
          <Link to="/sign-in">SIGN IN</Link>
        </li>
        <li>
          <Link to="/sign-up">SIGN UP</Link>
        </li>
      </ul>
      {/* )} */}
    </nav>
  );
};

export default NavBar;
