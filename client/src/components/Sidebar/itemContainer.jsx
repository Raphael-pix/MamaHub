/* eslint-disable react/prop-types */

import { useContext } from "react"
import { GlobalContext } from "../../context/context"

const ItemWrapper = ({title,items=[]})=>{
    return(
    <div className="menu-list-item">
        <li className="menu-item list-item-header ">{title}</li>
        <ItemContainer items={items}/>
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
