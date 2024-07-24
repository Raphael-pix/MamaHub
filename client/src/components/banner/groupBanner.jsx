/* eslint-disable react/prop-types */
import "./banner.css";
import { FaUserGroup } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const GroupBanner = ({ group }) => {
  const { avatar, banner, name, members, description, topics } = group;
  return (
    <header className="group-pofile-banner" style={{ backgroundImage:`url(${banner})`}}>
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
          <button>join</button>
          <button>
            <IoChatbubbleEllipsesOutline size={16} color="white" />
            chat
          </button>
        </div>
      </div>
      <div className="fade-over"></div>
    </header>
  );
};

export default GroupBanner;
