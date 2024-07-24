/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./banner.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Banner = () => {
const [visible,setVisible]=useState(true)

  return (
    <section className="banner" style={{display:`${visible ? 'flex' : 'none'}`}}>
     <div className="banner-text-section">
      <h1 className="superText">monitor your progress</h1>
      <p className="subText">
        Track your pregnancy step by step with our interactive timeline,
        featuring detailed graphics and weekly insights. Discover what to expect
        at each stage, including changes in your body and your baby's
        development.
      </p>
      <button className="FAB">
        <span>get started</span>
        <IoIosArrowForward size={14} color="#111" />
      </button>
      </div>
      <div className="banner-image-section">
        <img src="../../images/banner-image.png" alt="banner-image" />
      </div>
      <IoClose size={22} className="close-icon" color="white" onClick={()=>setVisible(false)}/>
    </section>
  );
};

export default Banner;
