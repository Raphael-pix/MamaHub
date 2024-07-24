import "./styles.css";

import { useState } from "react";

import { MdOutlineCameraAlt } from "react-icons/md";

const Media = () => {
  const [media, setMedia] = useState([]);

  if (media.length === 0) {
    return <section className="group-content-section">
        <div className="empty-state">
            <MdOutlineCameraAlt size={80} color="#545454"/>
            <p>no media</p>
        </div>
    </section>;
  }

  return <section className="group-content-section">

  </section>;
};

export default Media;
