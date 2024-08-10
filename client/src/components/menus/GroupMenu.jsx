import './styles.css'

import { FaInfoCircle } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

const GroupMenu = () => {
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
      <button className='button-red'>
        <MdBlock size={16} className="icon" />
        block group
      </button>
      <button className='button-red'>
        <IoExitOutline size={16} className="icon" />
        exit group
      </button>
    </section>
  );
};

export default GroupMenu;
