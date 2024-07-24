/* eslint-disable react/prop-types */
import './suggested.css'

const Suggested = ({user}) => {
  const {avatar,name} =user
  return (
    <div className="suggested-container">
      <div className="suggested-user-profile-image-container">
        <img src={avatar || '../../images/no-profile.png'} alt="" />
      </div>
      <p className="susggested-user-name">{name}</p>
      <button>view profile</button>
    </div>
  );
};

export default Suggested;
