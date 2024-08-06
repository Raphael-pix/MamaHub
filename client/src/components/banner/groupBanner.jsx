/* eslint-disable react/prop-types */
import "./banner.css";

import { useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import { FaUserGroup } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import { GlobalContext } from "../../context/context";
import { BsThreeDots } from "react-icons/bs";

const GroupBanner = ({ group, isMember }) => {
  const { setSelectedGroup, setIsGroupSelected } = useContext(GlobalContext);
  const { avatar, banner, name, members, description, topics } = group;
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const selectGroup = (value) => {
    setSelectedGroup(value);
    setIsGroupSelected(true);
  };

  const handleJoinGroup = async () => {
    try {
      const response = await axios.put("http://localhost:5000/api/join-group", {
          groupId: group.groupId,
          userId
      });
      console.log(response);
    } catch (err) {
      console.log("error occurred", err);
    }
  };

  return (
    <header
      className="group-pofile-banner"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="group-profile-image-container">
        <img src={avatar} alt="" />
      </div>
      <div className="group-details-wrapper">
        <h1 className="group-name">{name}</h1>
        <div className="status-members-count__warpper">
          <span className="group-status">public</span>
          <div className="member-count-wrapper">
            <FaUserGroup size={14} color="white" />
            {members.length}
          </div>
        </div>
        <div className="topics-list-wrapper">
          {topics
            .map((item) => {
              return item;
            })
            .join(", ")}
        </div>
        <p className="group-description">{description}</p>

        <div className="action-buttons-container">
          {isMember ? (
            <button>add post</button>
          ) : (
            <button onClick={handleJoinGroup}>join</button>
          )}
          <button onClick={() => selectGroup(group)}>
            <IoChatbubbleEllipsesOutline size={16} color="white" />
            chat
          </button>
        </div>
      </div>
      <BsThreeDots size={24} color="white" className="settings-icon" />
      <div className="fade-over"></div>
    </header>
  );
};

export default GroupBanner;
