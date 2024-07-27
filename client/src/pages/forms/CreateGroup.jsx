import "./forms.css";
import "react-datepicker/dist/react-datepicker.css";

import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie'

import { FaRegUser } from "react-icons/fa6";

import topics from "./topics";
import Searchbar from "../../components/Searchbar/Searchbar";
import AddMemebersContainer from "../../components/addMembersContainer/AddMemebersContainer";
import { GlobalContext } from "../../context/context";
import useOutsideClick from "../../hooks/OutsideClick";


const cookies = new Cookies()
const initialState = {
  avatar:
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
  banner:
    "https://images.unsplash.com/photo-1548869447-faef5000334c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  name: "",
  description: "",
  members: [],
  topics: [],
  userId:cookies.get('userId')
};

export default function CreateGroup() {
  const [form, setForm] = useState(initialState);
  const [, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [checkedTopics, setCheckedTopics] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const{setIsCreateGroupVisible} = useContext(GlobalContext)

  const navigate = useNavigate();
  const outsideRef = useRef()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const reloadWindow = () => {
    navigate("/home");
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { avatar, banner, name, description,status,members,topics,userId } = form;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/create-group",
        {
          avatar,
          banner,
          name,
          description,
          status,
          members,
          topics,
          userId
        }
      );
      const result = await response.data;
      console.log(result);

      reloadWindow();
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err.response?.data?.message || err.name);
    }
    setLoading(false);
  };

  const onSearch = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/search-users",
        {
          params: { query: searchQuery },
        }
      );
      setResults(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxClick = (topic) => {
    setCheckedTopics((prevCheckedTopics) => {
      const newCheckedTopics = prevCheckedTopics.includes(topic.name)
        ? prevCheckedTopics.filter((name) => name !== topic.name)
        : [...prevCheckedTopics, topic.name];

      setForm((prevForm) => ({
        ...prevForm,
        topics: newCheckedTopics,
      }));
      return newCheckedTopics;
    });
  };


  const addMembers = (member) => {
    setSelectedMembers((prevSelectedMembers) => {
      const newMembers = [...prevSelectedMembers, member];
      setForm((prevForm) => ({
        ...prevForm,
        members: newMembers,
      }));
     setResults([])
     setQuery('')
      return newMembers;
    });
  };

  const handleDelete = (value) => {
    setSelectedMembers((prevSelectedMembers) => {
      const newMembers = prevSelectedMembers.filter((member) => member.userId !== value);
      // Update the form state with the new members list
      setForm((prevForm) => ({
        ...prevForm,
        members: newMembers,
      }));
      return newMembers;
    });
  };

  const closeCreateGroup = ()=>{
    setIsCreateGroupVisible(false)
    setForm({...form,initialState})
  }
  useOutsideClick(outsideRef,closeCreateGroup)
  return (
    <div className="create-group-form-wrapper form-wrapper">
      <div className="form-container create-group-form" ref={outsideRef}>
        <h1 className="form-title">create a group</h1>

        <div className="form-input-container create-group-input-container">
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
            <label className="form-label" htmlFor="description">
              description
            </label>
            <div className="input-wrapper">
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-input"
                placeholder=""
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
            <label className="form-label" htmlFor="name">
              banner url
            </label>
            <div className="input-wrapper">
              <FaRegUser size={16} className="user-icon icon" />
              <input
                type="text"
                name="banner"
                id="banner"
                className="form-input"
                placeholder="enter banner url"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-container">
            <label className="form-label" htmlFor="status">
              status
            </label>
            <div className="radio-input-wrapper">
              <div className="input-wrapper radio">
                <input
                  type="radio"
                  name="status"
                  id="public"
                  value={"public"}
                  onChange={handleChange}
                />
                <span>Anyone can join(public)</span>
              </div>
              <div className="input-wrapper radio">
                <input
                  type="radio"
                  name="status"
                  id="private"
                  value={"private"}
                  onChange={handleChange}
                />
                <span>Only authorized users can enter(private)</span>
              </div>
            </div>
          </div>

          <div className="input-container">
            <label className="form-label" htmlFor="status">
              topics
            </label>
            <div className="checkbox-input-wrapper">
              {topics.map((topic) => {
                const isChecked = checkedTopics.includes(topic.name);
                return (
                  <div
                    className={`input-wrapper checkbox ${
                      isChecked ? "active" : ""
                    }`}
                    key={topic.id}
                    onClick={() => handleCheckboxClick(topic)}
                  >
                    <input
                      type="checkbox"
                      name="status"
                      id={topic.name}
                      value={topic.name}
                      onChange={handleChange}
                    />
                    <span>{topic.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="input-container">
            <label className="form-label" htmlFor="status">
              add members
            </label>
            <div className="search-members-wrapper">
              <Searchbar onSearch={onSearch} query={query} />
              <div className="search-results-container">
                {results && results.length > 0
                  ? results.map((item) => {
                      return (
                        <div
                          className="result-container"
                          key={item.userId}
                          onClick={() => addMembers(item)}
                        >
                          <div className="results-avatar">
                            <img src={item.avatar} alt="" />
                          </div>
                          <p className="result-name">{item.name}</p>
                        </div>
                      );
                    })
                  : null}
              </div>
              {selectedMembers && selectedMembers.length > 0 ? (
                <div className="members-list results">
                  {selectedMembers.map((item) => {
                    return (
                      <AddMemebersContainer
                        avatar={item.avatar}
                        name={item.name}
                        key={item.userId}
                        onDelete= {()=>handleDelete(item.userId)}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            create
          </button>
          <button className="close-btn" onClick={closeCreateGroup}>close</button>
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
  );
}
