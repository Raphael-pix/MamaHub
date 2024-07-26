/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./itemContainer.css";
import { IoMdAddCircleOutline } from "react-icons/io";

const ItemContainer = ({ id, avatar, name, categories }) => {
  return (
    <div className="item-container">
      <div className="user-Avatar-container">
        <img src={avatar} alt="" />
      </div>
      <div className="user-details-wrapper">
        <div className="header">
          <Link to={`/group/profile/${id}`}>
            <h1 className="username">{name}</h1>
          </Link>
          <button className="follow-btn">
            <IoMdAddCircleOutline size={14} color="#FFFFFF" />
            <span>join</span>
          </button>
        </div>
        <p className="categories">
          {categories
            .map((item) => {
              return item;
            })
            .join(", ")}
        </p>
        {/*  
        <p className="description">
          {description}
        </p>
        */}
      </div>
    </div>
  );
};

export default ItemContainer;
