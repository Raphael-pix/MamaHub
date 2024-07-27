/* eslint-disable react/prop-types */

import { useContext, useState } from "react"
import { GlobalContext } from "../../context/context"

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

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
const {setSelectedGroup,setIsGroupSelected}=useContext(GlobalContext)
const selectGroup = (value)=>{
  setSelectedGroup(value)
  setIsGroupSelected(true)
}

  return (
    <ul className="joined-wrapper">
      {
        items.map((item)=>{
           return <li className="joined-item" key={item._id} onClick={()=>selectGroup(item)}>{item.name}</li>
        })
      }
    </ul>
  )
}

export default ItemWrapper
