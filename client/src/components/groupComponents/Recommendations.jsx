import "./styles.css";

import { useState } from "react";

import { MdOutlinePhotoLibrary  } from "react-icons/md";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  if (recommendations.length === 0) {
    return <section className="group-content-section">
        <div className="empty-state">
            <MdOutlinePhotoLibrary size={80} color="#545454"/>
            <p>no recommendations</p>
        </div>
    </section>;
  }

  return <section className="group-content-section">

  </section>;
};

export default Recommendations;
