import "./navbar.css";

import { landingMenu } from "./navMenu";
import Logo from '../logo/Logo'

import { NavLink,useNavigate } from "react-router-dom";




export default function Landing() {
  const navigate = useNavigate()

  return (
    <nav
      className="navbar-container"
    >
        <Logo/>
      <ul className="nav-menu">
        {landingMenu.map((menuItem) => {
          return (
            <NavLink
              key={menuItem.label}
              to={menuItem.to}
              className="menu-item"
              style={({ isActive }) =>
                isActive
                  ? { color: "#FF4F00", fontWeight: 600 }
                  : { color: "#5F5F5F" }
              }
            >
              {menuItem.label}
            </NavLink>
          );
        })}
      </ul>

      <div className="right-section">
          <button className="login-btn" onClick={()=>navigate('/get-started')}>sign up</button>
      </div>
    </nav>
  );
}
