import "./Header.css";
import { FaCarSide, FaUser } from "react-icons/fa";
import { NavButton } from "../NavButton";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { LogoutButton } from "../user/LogoutButton";

/**
 * Header component that displays the navigation bar with logo and user options.
 * @returns {JSX.Element} The rendered header component.
 */
export function Header() {
  const { isLoggedIn, username  } = useContext(AuthContext);
  console.log(isLoggedIn);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaCarSide className="logo-icon" />
        <NavButton className="logo-text" to="/" label="AutoVitals"/>
      </div>
      {isLoggedIn ?       
      <>
        <div className="navbar-right">
          <FaUser className="user-icon" />
          <NavButton className="" to={`/profile/${username}`} label="Profile"/>
          <LogoutButton/>
        </div>
      </> : 
      <>
        <div className="navbar-right">
          <FaUser className="user-icon" />
          <NavButton className="" to="/login" label="Login"/>
          <NavButton className="get-started" to="/signup" label="Get Started"/>
        </div>
      </>
      }
    </nav>
  );
}
