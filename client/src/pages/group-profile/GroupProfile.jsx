import "./groupProfile.css";
import {
  GroupBanner,
  Navigation,
  Journeys,
  Media,
  Recommedations,
  SuggestedContainer,
} from "../../components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/context";
import { Link, useParams } from "react-router-dom";
import Cookies from 'universal-cookie'

const GroupProfile = () => {
  const cookies = new Cookies()
  const userId = cookies.get('userId')
  const { currentGroupSection } = useContext(GlobalContext);
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [users, setUsers] = useState([]);
  const [userIsMember,setUserIsMember] = useState(false)

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/all-users");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const getGroupDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/group-details",
        {
          params: { id },
        }
      );
      setGroup(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getGroupDetails();
  }, [id,group]);
 
  const checkUserisMember = (members)=>{
    const membersId = members.map(member=>{
      return member.userId
    })
    return membersId.includes(userId)
  }
  useEffect(()=>{
    if(group){
    setUserIsMember(checkUserisMember(group.members))
    }
  },[group])

  if (group) {
    return (
      <section className="group-profile">
        <GroupBanner group={group} isMember={userIsMember}/>
        <section className="group-profile-body">
          <Navigation />
          {currentGroupSection === "journeys" ? (
            <Journeys />
          ) : currentGroupSection === "media" ? (
            <Media />
          ) : currentGroupSection === "recommendations" ? (
            <Recommedations />
          ) : null}
          {users.length > 0 ? (
            <section className="suggested-section">
              <h1 className="title">suggested</h1>
              <section className="suggested-section-items">
                {users.map((user) => {
                  return (
                    <Link to={`/user/profile/${user.userId}`} key={user._id}>
                      <SuggestedContainer user={user} />;
                    </Link>
                  );
                })}
              </section>
            </section>
          ) : null}
        </section>
      </section>
    );
  }
};

export default GroupProfile;
