/* eslint-disable react/prop-types */
import "./post.css";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart , FaRegComment, FaRegBookmark } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";

const PostItem = ({userProfile,post,name,timeAdded,caption}) => {
  return (
    <section className="post-item-container">
      <div className="post-header">
        <div className="user-info-wrapper">
          <div className="user-avatar">
            <img src={userProfile} alt="user-avatar" />
          </div>
          <div className="username">
            <p className="name">{name}</p>
            <p className="time-added">{timeAdded}</p>
          </div>
        </div>
        <BsThreeDots size={20}  className="post-icon"/>
      </div>
      <div className="post-image-container">
        <img src={post} alt="post" />
      </div>
      <div className="post-footer">
        <p className="comment">{caption}</p>
        <div className="post-controls">
          <FaRegHeart size={18} className="post-icon"/>
          <FaRegComment size={18} className="post-icon"/>
          <IoIosShareAlt size={18} className="post-icon"/>
          <FaRegBookmark size={18} className="post-icon"/>
        </div>
      </div>
    </section>
  );
};

export default PostItem;
