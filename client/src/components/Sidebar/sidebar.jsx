import "./sidebar.css";

import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

import { IoMdSettings } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";

import Logo from "../logo/Logo";
import Searchbar from "../Searchbar/Searchbar";
import ItemWrapper from "./itemContainer";
import { GlobalContext } from "../../context/context";



const cookies = new Cookies();

export default function SideBar() {
  const navigate = useNavigate();
  const userId = cookies.get('userId')
  const [groups,setGroups]= useState([])
  const {setIsCreateGroupVisible}=useContext(GlobalContext)



  const getAllGroups = async()=>{
    const response = await axios.get('http://localhost:5000/api/get-groups', {
      params: { userId }
    });
    setGroups(response.data)
  }
  useEffect(()=>{
    getAllGroups()
  },[userId,groups])

  // when logging out delete all the saved cookies  then navigate to the get started page
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("email"), 
    cookies.remove("hashedPassword");
    cookies.remove("name");
    cookies.remove("image");
    cookies.remove("profile Token");
    cookies.remove("username");

    navigate("/get-started");
    window.location.reload();
  };


  return (
    <aside className="sidebar-container">
      <Logo />
      <Searchbar />
      <div className="dashboard sidebar-content">
        <h1 className="title">Dashboard</h1>
        <ul className="menu-list list">
          <ItemWrapper title={"chats"}  id={1}/>
          <ItemWrapper title={"groups"} items={groups} id={2}/>
          <ItemWrapper title={"continue reading"} id={3}/>

          <li className="menu-item list-item-header">
            <NavLink to={"/profile"} className="link">
              profile
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="settings sidebar-content">
        <ul className="settings-list list">
          <li className="settings-item list-item-header">
              <div className="link" onClick={()=>setIsCreateGroupVisible(true)}>
                <MdGroup size={18} />
                <span>create a group</span>
              </div>
          </li>
          <li className="settings-item list-item-header">
            <NavLink to={"/settings"} className="link">
              <IoMdSettings size={18} />
              <span>settings</span>
            </NavLink>
          </li>
          <li className="settings-item list-item-header">
            <div className="link logout" onClick={logout}>
              <TbLogout2 className="logout-icon" size={18} />
              <span>log out</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
