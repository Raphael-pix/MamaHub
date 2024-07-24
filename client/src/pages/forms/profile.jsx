import "./forms.css";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";

import Logo from "../../components/logo/Logo";

import { FaRegUser } from "react-icons/fa6";

const cookies = new Cookies();
const initialState = {
  avatar:
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
  name: "",
  date: new Date(),
  bio: "",
  gender: "prefer not to say",
};

export default function CreateProfile() {
  const [form, setForm] = useState(initialState);
  const [, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userID = cookies.get("userId");

  const handleChange = (e) => {
    if (e && e.target) {
      setForm({ ...form, [e.target.name]: e.target.value });
    } else {
      const isValidDate = moment(e, "DD/MM/YY", true).isValid();
      if (isValidDate) {
        const newDate = moment(e).format("DD/MM/YY");
        setForm({ ...form, date: newDate });
      } else {
        const newDate = moment(initialState.date).format("DD/MM/YY");
        setForm({ ...form, date: newDate });
      }
    }
    console.log(form);
  };

  const reloadWindow = () => {
    navigate("/home");
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { avatar, name, date, bio, gender } = form;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/create-profile",
        {
          avatar,
          name,
          date,
          bio,
          gender,
          userId: userID,
        }
      );
      const result = await response.data;
      console.log(result);

      cookies.set("name", result.name);
      cookies.set("image", result.avatar);
      cookies.set("profile Token", result.profileToken);

      reloadWindow();
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err.response?.data?.message || err.name);
    }
    setLoading(false);
  };

  return (
    <div className="form">
      <div className="form-wrapper">
        <Logo />
        <div className="form-container create-profile-form">
          <h1 className="form-title">create your profile</h1>

          <div className="form-input-container">
            <div className="input-container">
              <label className="form-label" htmlFor="name">
                name
              </label>
              <div className="input-wrapper">
                <FaRegUser size={16} className="user-icon icon" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-input"
                  placeholder="enter name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-container">
              <label className="form-label" htmlFor="name">
                avatar url
              </label>
              <div className="input-wrapper">
                <FaRegUser size={16} className="user-icon icon" />
                <input
                  type="text"
                  name="avatar"
                  id="avatar"
                  className="form-input"
                  placeholder="enter avatar url"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-container">
              <label className="form-label" htmlFor="DOB">
                Date of birth
              </label>
              <div className="input-wrapper">
                <DatePicker
                  selected={
                    form.date ? moment(form.date, "DD/MM/YYYY").toDate() : null
                  }
                  placeholderText="dd/mm/yy"
                  onChange={handleChange}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>

            <div className="input-container">
              <label className="form-label" htmlFor="bio">
                Bio
              </label>
              <div className="input-wrapper">
                <textarea
                  type="text"
                  name="bio"
                  id="bio"
                  className="form-input"
                  placeholder=""
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-container">
              <label className="form-label" htmlFor="gender">
                Gender
              </label>
              <div className="radio-input-wrapper">
                <div className="input-wrapper radio">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value={"male"}
                    onChange={handleChange}
                  />
                  <span>male</span>
                </div>
                <div className="input-wrapper radio">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value={"female"}
                    onChange={handleChange}
                  />
                  <span>female</span>
                </div>
                <div className="input-wrapper radio">
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value={"other"}
                    onChange={handleChange}
                  />
                  <span>other</span>
                </div>
                <div className="input-wrapper radio">
                  <input
                    type="radio"
                    name="gender"
                    id="unknown"
                    value={"prefer not to say"}
                    onChange={handleChange}
                  />
                  <span>prefer not to say</span>
                </div>
              </div>
            </div>
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              create
            </button>
          </div>
          {error ? (
            <div className="error-message">
              <ul className="error-list">
                {error.map((errorItem, index) => (
                  <li key={index}>{errorItem}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div className="background"></div>
    </div>
  );
}
