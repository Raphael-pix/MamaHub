import "./group.css";

import { useState, useEffect } from "react";
import axios from "axios";

import { GroupContainer } from "../../components";

const Group = () => {
  const [groups, setGroups] = useState([]);

  const getAllGroups = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/all-groups");
      setGroups(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);


  return (
    <section className="group-section">
      <div className="group-section-wrapper">
        <h1 className="groups-section-title">Early pregnancy</h1>
        <div className="groups-wrapper">
          {groups.map((group) => {
            return <GroupContainer group={group} key={group._id} />;
          })}
        </div>
      </div>
      <div className="group-section-wrapper">
        <h1 className="groups-section-title">Early pregnancy</h1>
        <div className="groups-wrapper">
          {groups.map((group) => {
            return <GroupContainer group={group} key={group._id} />;
          })}
        </div>
      </div>
      <div className="group-section-wrapper">
        <h1 className="groups-section-title">Early pregnancy</h1>
        <div className="groups-wrapper">
          {groups.map((group) => {
            return <GroupContainer group={group} key={group._id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Group;
