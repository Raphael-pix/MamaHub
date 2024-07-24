import "./navbar.css";

import menu from "./navMenu";

import { Link, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";

import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";

const cookies = new Cookies();

export default function Navbar() {
  const avatar = cookies.get("image");
  const userId = cookies.get("userId");
  console.log(avatar)

  return (
    <nav className="navbar-container">
      <ul className="nav-menu">
        {menu.map((menuItem) => {
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
        <MdOutlineAddBox size={24} className="icon-btns" />
        <IoNotificationsOutline size={24} className="icon-btns" />

        <Link to={`/user/profile/${userId}`}>
          <div className="avatar-container">
            <img src={avatar} alt="" className="avatar" />
          </div>
        </Link>
      </div>
    </nav>
  );
}
