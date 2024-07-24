import { useContext, useState } from "react";
import "./styles.css";
import { GlobalContext } from "../../context/context";

const Navbar = () => {
  const { currentGroupSection, setCurrentGroupSection,setCurrentUserSection,currentUserSection} =
    useContext(GlobalContext);
  const [currentPage,setCurrentPage] = useState('')

  const handleClick = (itemName) => {
    const path = window.location.pathname;
    console.log(path)
    const isUserProfile = /^\/user\/profile\/[^/]+$/.test(path);
    const isGroupProfile = /^\/group\/profile\/[^/]+$/.test(path);

    if (isGroupProfile) {
      setCurrentGroupSection(itemName);
      setCurrentPage('group')
    } else if (isUserProfile) {
      setCurrentUserSection(itemName);
      setCurrentPage('user')
    }
  };

  const items = [
    {
      name: "journeys",
    },
    {
      name: "media",
    },
    {
      name: "recommendations",
    },
  ];

  return (
    <nav className="group-navigation-menu">
      {items.map((item) => {
        return (
          <button
            className={`group-navigation-button ${
              currentPage === 'group' ?
              currentGroupSection === item.name ? "active" : "" :
              currentUserSection === item.name ? "active" : ""
            }`}
            onClick={() => handleClick(item.name)}
            key={item.name}
          >
            {item.name}
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
