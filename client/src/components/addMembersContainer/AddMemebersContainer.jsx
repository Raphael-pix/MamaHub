/* eslint-disable react/prop-types */
import './style.css'

import { FaMinus } from "react-icons/fa6";

const AddMemebersContainer = ({ avatar, name,onDelete }) => {
  return (
    <div className="add-members-container">
      <div className="member-details-wrapper">
        <div className="member-avatar-container">
          <img src={avatar} alt="" />
        </div>
        <p className="member-name">{name}</p>
      </div>
      <FaMinus size={16} color="FF0800" onClick={onDelete} className='remove-user-btn'/>
    </div>
  );
};

export default AddMemebersContainer;
