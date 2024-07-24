import "./post.css";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart , FaRegComment, FaRegBookmark } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";

const PostItem = () => {
  return (
    <section className="post-item-container">
      <div className="post-header">
        <div className="user-info-wrapper">
          <div className="user-avatar">
            <img src="../../images/image-forms.jpg" alt="user-avatar" />
          </div>
          <div className="username">
            <p className="name">Mary Wanjiku</p>
            <p className="time-added">1dy</p>
          </div>
        </div>
        <BsThreeDots size={20}  className="post-icon"/>
      </div>
      <div className="post-image-container">
        <img src="../../images/post.jpg" alt="post" />
      </div>
      <div className="post-footer">
        <p className="comment">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec
          quam sit amet sem tempus porta.
        </p>
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
