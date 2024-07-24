/* eslint-disable react/prop-types */
import "./itemContainer.css";
import { IoMdAddCircleOutline } from "react-icons/io";

const ItemContainer = ({avatar,name,categories}) => {
  return (
    <div className="item-container">
      <div className="user-Avatar-container">
        <img src={avatar} alt="" />
      </div>
      <div className="user-details-wrapper">
        <div className="header">
          <h1 className="username">{name}</h1>
          <button className="follow-btn">
            <IoMdAddCircleOutline size={14} color="#FFFFFF" />
            <span>Follow</span>
          </button>
        </div>
        <p className="categories">{
          categories.map((item)=>{
            return item
          }).join(', ')
          }</p>
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
