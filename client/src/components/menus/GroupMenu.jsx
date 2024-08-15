/* eslint-disable react/prop-types */
import "./styles.css";

import axios from "axios";
import Cookies from "universal-cookie";

import { FaInfoCircle } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

const GroupMenu = ({ group }) => {
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const handleExitGroup = async () => {
    try {
      const response = await axios.delete("http://localhost:5000/api/exit-group", {
        data: { userId, groupId: group.groupId },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="group-menu-section">
      <button>
        <FaInfoCircle size={16} className="icon" />
        about this group
      </button>
      <button>
        <FaShare size={16} className="icon" />
        share
      </button>
      <button className="button-red">
        <MdBlock size={16} className="icon" />
        block group
      </button>
      <button className="button-red" onClick={handleExitGroup}>
        <IoExitOutline size={16} className="icon" />
        exit group
      </button>
    </section>
  );
};

export default GroupMenu;
