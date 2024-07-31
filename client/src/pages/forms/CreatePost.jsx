import "./forms.css";

import { useContext, useRef, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";

import { FaPlus } from "react-icons/fa";
import { GlobalContext } from "../../context/context";
import useOutsideClick from "../../hooks/OutsideClick";
import { PostItem } from "../../components";

const initialState = {
  media: null,
  mediaPreview: "",
  caption: "",
  date: Date.now(),
};
const cookies = new Cookies();

export default function CreatePost() {
  const [form, setForm] = useState(initialState);
  const [, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const outsideRef = useRef();
  const username = cookies.get("username");
  const userProfile = cookies.get("image");
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
    const { media, mediaPreview, caption } = form;
    console.log(form);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mediaPreview", mediaPreview);
      formData.append("media", media);
      formData.append("caption", caption);

      const response = await axios.post(
        "http://localhost:5000/api/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const mediaURL = URL.createObjectURL(file);
      setForm({
        ...form,
        media: file,
        mediaPreview: mediaURL,
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
                  form.media.type.startsWith("image/") ? (
                    <img
                      src={form.mediaPreview}
                      alt=""
                      className="post-media"
                    />
                  ) : (
                    <video
                      src={form.mediaPreview}
                      alt=""
                      className="post-media"
                    />
                  )
                ) : (
                  <FaPlus size={22} color="#d9d9d9" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*,video/*"
                onChange={handleFileChange}
                name="post"
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
            <button
              type="submit"
              className="submit-btn"
              disabled={form.media === null}
              onClick={handleSubmit}
            >
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
        <form className="form-container create-post-form" ref={outsideRef}>
          <PostItem
            name={username}
            userProfile={userProfile}
            media={form.mediaPreview}
            timeAdded={moment(form.date).fromNow()}
            caption={form.caption}
            mediaType={form.media.type.startsWith("image/") ? "image" : "video"}
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
        </form>
      )}
    </div>
  );
}
