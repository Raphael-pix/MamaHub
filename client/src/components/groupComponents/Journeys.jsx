import "./styles.css";

import { useState } from "react";

import { FaWalking } from "react-icons/fa";

const Journeys = () => {
  const [journeys, setJourneys] = useState([]);

  if (journeys.length === 0) {
    return <section className="group-content-section">
        <div className="empty-state">
            <FaWalking size={80} color="#545454"/>
            <p>no journeys</p>
        </div>
    </section>;
  }

  return <section className="group-content-section">

  </section>;
};

export default Journeys;
