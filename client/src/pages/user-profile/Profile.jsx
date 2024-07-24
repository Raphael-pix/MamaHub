import "./profile.css";

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import {
  FaRegCommentDots,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import {
  Journeys,
  Media,
  Navigation,
  Recommedations,
  SuggestedContainer,
} from "../../components";
import { GlobalContext } from "../../context/context";

const Profile = () => {
  const { currentUserSection } = useContext(GlobalContext);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

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

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user-details",
        {
          params: { id },
        }
      );
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, [id]);

  if (user) {
    return (
      <section className="user-profile-section">
        <section className="user-profile-container">
          <section className="user-profile-wrapper">
            <div className="user-profile-image-container">
              <img src={user.avatar} alt="" />
            </div>
            <h1 className="user-profile-name">{user.name}</h1>
            <div className="profile-action-buttons-wrapper">
              <button>
                <FaRegCommentDots size={16} color="white" />
                chat
              </button>
              <BsThreeDots size={14} className="fab-icon" />
            </div>
            <div className="user-bio-wrapper">
              <h2 className="title">Bio</h2>
              <p className="user-bio">{user.bio}</p>
            </div>
            <div className="user-contacts-wrapper">
              <h2 className="title">Contacts</h2>
              <div className="user-contacts">
                <FaWhatsapp size={25} color="#545454" />
                <FaInstagram size={25} color="#545454" />
                <FaFacebook size={25} color="#545454" />
              </div>
            </div>
          </section>
          <section className="user-media-wrapper">
            <Navigation />
            {currentUserSection === "journeys" ? (
              <Journeys />
            ) : currentUserSection === "media" ? (
              <Media />
            ) : currentUserSection === "recommendations" ? (
              <Recommedations />
            ) : null}
          </section>
        </section>
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
    );
  }
};

export default Profile;
