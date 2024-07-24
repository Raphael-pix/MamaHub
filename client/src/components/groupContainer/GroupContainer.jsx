/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./style.css";

const GroupContainer = ({ group }) => {
  const { groupId, avatar, name, topics} = group;
  return (
    <Link to={`/group/profile/${groupId}`}>
      <section className="group-container">
        <div className="profile-image-conatiner">
          <img src={avatar} alt="" />
        </div>
        <div className="group-details-container">
          <div className="group-details-header">
            <h1 className="group-details-name">{name}</h1>
            <p className="group-details-status">public</p>
          </div>
          <div className="groups-details-topics">
            <p className="group-details-topics-list">
              {topics
                .map((item) => {
                  return item;
                })
                .join(", ")}
            </p>
          </div>
             {/* 
             description should be described in props
          <div className="group-details-description">
            <p>{description}</p>
          </div>
          */}
        </div>
      </section>
    </Link>
  );
};

export default GroupContainer;
