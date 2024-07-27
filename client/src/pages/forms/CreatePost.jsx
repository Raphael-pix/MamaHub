import "./forms.css";

import { useContext, useRef, useState } from "react";
import axios from "axios";

import { FaPlus } from "react-icons/fa";
import { GlobalContext } from "../../context/context";
import useOutsideClick from "../../hooks/OutsideClick";
import { PostItem } from "../../components";

const initialState = {
  media: null,
  caption: "",
  date: Date.now(),
};

export default function CreatePost() {
  const [form, setForm] = useState(initialState);
  const [, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const outsideRef = useRef();
  const { setIsCreatePostVisible } = useContext(GlobalContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const reloadWindow = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { post, caption } = form;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/create-post",
        {
          post,
          caption,
          date: initialState.date,
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

  const handleAddMedia = () => {
    fileInputRef.current.click();
  };
  const handleFileChnage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const mediaURL = URL.createObjectURL(file);
      setForm({
        ...form,
        media: {
          url: mediaURL,
          type: file.type.startsWith("video") ? "video" : "image",
        },
      });
    }
  };
  const closeCreatePost = () => {
    setIsCreatePostVisible(false);
    setForm({
      ...form,
      media: initialState.media,
      caption: initialState.caption,
    });
    console.log(form);
  };
  useOutsideClick(outsideRef, closeCreatePost);

  return (
    <div className="create-post-form-wrapper form-wrapper">
      {!showPreview ? (
        <div className="form-container create-post-form" ref={outsideRef}>
          <h1 className="form-title">share your journey</h1>

          <div className="form-input-container create-post-input-container">
            <div className="input-container post-wrapper">
              <div className="post-preview-container">
                {form.media ? (
                  form.media.type === "image" ? (
                    <img src={form.media.url} alt="" className="post-media" />
                  ) : (
                    <video src={form.media.url} alt="" className="post-media" />
                  )
                ) : (
                  <FaPlus size={22} color="#d9d9d9" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*,video/*"
                onChange={handleFileChnage}
              />
              <button className="add-media-btn" onClick={handleAddMedia}>
                add media
              </button>
            </div>
            <div className="input-container caption-wrapper">
              <label className="form-label" htmlFor="caption">
                caption
              </label>
              <div className="input-wrapper">
                <textarea
                  type="text"
                  name="caption"
                  id="caption"
                  className="form-input"
                  value={form.caption}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              className="show-preview"
              disabled={form.media === null}
              onClick={() => setShowPreview(true)}
            >
              preview
            </button>
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              share
            </button>
            <button className="close-btn" onClick={closeCreatePost}>
              close
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
      ) : (
        <div className="form-container create-post-form" ref={outsideRef}>
          <PostItem
            name={"mary wanjiku"}
            post={form.media.url}
            timeAdded={"1dy"}
            caption={form.caption}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            share
          </button>
          <div className="post-buttons-wrapper">
            <button className="close-btn" onClick={() => setShowPreview(false)}>
              back
            </button>
            <button className="close-btn" onClick={closeCreatePost}>
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
