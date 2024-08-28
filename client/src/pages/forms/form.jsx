import "./forms.css";

import { useContext, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import { FaRegUser, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import Logo from "../../components/logo/Logo";
import { GlobalContext } from "../../context/context";

const cookies = new Cookies();
const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const [form, setForm] = useState(initialState);
  const [, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isSignup, switchForm } = useContext(GlobalContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('')
  };

  // after logging in or signing up check the page the user is in
  // if in signup page, move to creating a profile
  //if in login page , move to home page
  const reloadWindow = () => {
    isSignup ? navigate("/create-profile") : navigate("/home");
    window.location.reload();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = form;

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/${isSignup ? "signup" : "login"}`,
        {
          email,
          password,
          confirmPassword,
        }
      );
      const result = await response.data;

      cookies.set("token", result.token);
      cookies.set("email", result.email);
      cookies.set("userId", result.userId);

      //set the cookies only when logging in/creating profile so as to avoid cookies being set as undefined
      if (!isSignup) {
        cookies.set("profile Token", result.profileToken);
        cookies.set("image", result.avatar);
        cookies.set("username",result.name)
      } else {
        cookies.set("hashed password", result.hashedPassword);
      }

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
        <div className="form-container">
          <h1 className="form-title">{isSignup ? "Sign Up" : "Sign In"}</h1>
          <div className="form-input-container">
            <div className="input-container">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <div className="input-wrapper">
                <FaRegUser size={16} className="user-icon icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                  placeholder="enter email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-container">
              <label className="form-label" htmlFor="passowrd">
                Password
              </label>
              <div className="input-wrapper">
                <FaLock size={16} className="user-icon icon" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder=""
                  onChange={handleChange}
                />
                <div
                  className="showPassword-container"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <FaRegEye size={14} className="icon" />
                  ) : (
                    <FaRegEyeSlash size={14} className="icon" />
                  )}
                </div>
              </div>
            </div>
            {isSignup && (
              <div className="input-container">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <FaLock size={16} className="user-icon icon" />
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-input"
                    placeholder=""
                    onChange={handleChange}
                  />
                  <div
                    className="showPassword-container"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <FaRegEye size={14} className="icon" />
                    ) : (
                      <FaRegEyeSlash size={14} className="icon" />
                    )}
                  </div>
                </div>
              </div>
            )}
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              {isSignup ? "create account" : "log in"}
            </button>
            <p className="form-text">terms and conditions apply</p>
            <p className="form-text">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchForm} className="link">
                {isSignup ? "Log in" : "sign up"}
              </span>
            </p>
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
      </div>
      <div className="background"></div>
    </div>
  );
}
