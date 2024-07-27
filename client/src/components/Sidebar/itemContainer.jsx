/* eslint-disable react/prop-types */

import {useState } from "react"

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";

const ItemWrapper = ({title,items=[],id})=>{

    const [selected,setSelected]=useState(null);
    const handleSelection = ()=>{
      setSelected(selected === id ? null : id)
    }

    return(
    <div className="menu-list-item">
        <h1 className="menu-item list-item-header" onClick={()=>handleSelection(id)}>
          {title}
          {
          selected === id ? 
          <MdKeyboardArrowUp size={16}/>
          :
          <MdKeyboardArrowDown size={16}/>
          }
        </h1>
        {
        selected === id &&
        <ItemContainer items={items}/>
        }
      </div>
    )
}

const ItemContainer = ({items}) => {

  return (
    <ul className="joined-wrapper">
      {
        items.map((item)=>{
           return <Link to={`/group/profile/${item.groupId}`} key={item._id}  className="joined-item-link">
              <li className="joined-item"  >{item.name}</li>
            </Link>
        })
      }
    </ul>
  )
}

export default ItemWrapper
