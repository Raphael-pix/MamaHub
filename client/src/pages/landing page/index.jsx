/* eslint-disable react/no-unescaped-entities */
import "./index.css";

import { Footer, LandingBanner, LandingNavbar } from "../../components";
import { FaPersonWalking,FaLocationCrosshairs } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineMessage,MdOutlineGroups } from "react-icons/md";
import { GiMeal } from "react-icons/gi";

const services = [
  {
    id: 1,
    title: 'share your journey',
    description: "Post your journey so that others can learn.",
    icon:<FaPersonWalking size={40} color="#FF4F00"/>
  },
  {
    id: 2,
    title: 'track your pregnancy',
    description: "Track your baby's growth and learn more about the changes to expect.",
    icon:<FaLocationCrosshairs size={40} color="#FF4F00"/>
  },
  {
    id: 3,
    title: 'plan your meals',
    description: "Plan your meals ahead of time and learn about the best foods for both you and your baby",
    icon:<GiMeal size={40} color="#FF4F00"/>
  },
  {
    id: 4,
    title: 'learn',
    description: "Learn about how to cope with pregnancy and life as a parent.",
    icon:<FaBookOpen size={40} color="#FF4F00"/>
  },
  {
    id: 5,
    title: 'chat with others',
    description: "Connect with other users and learn about them and their journey.",
    icon:<MdOutlineMessage size={40} color="#FF4F00"/>
  },
  {
    id: 6,
    title: 'join groups',
    description: "Join groups with like-minded people seek guidance and chat.",
    icon:<MdOutlineGroups size={40} color="#FF4F00"/>
  },
]

const Index = () => {
  return (
    <section className="landing-section">
      <LandingNavbar />
      <LandingBanner />
      <section className="about-section">
        <div className="about-section-text">
          <h1 className="about-section-header-text header-text">about us</h1>
          <p className="about-section-sub-text">
            Welcome to Mamahub! It provides a platform for soon-to-be and new
            parents to seek guidance, learn from experiences of those on similar
            journeys. Mamahub: Post your Mums-story, get informed and join a
            group of like-minded all new mamas! Whether you're expecting a baby,
            or are adjusting to life with your newborn, Mamahub is here for as
            long as you need it!
          </p>
        </div>
        <div className="about-section-image">
          <img src="../../images/about-section.jpg" alt="" />
        </div>
      </section>
      <section className="services-section">
        <div className="services-section-text">
          <h1 className="services-section-header-text header-text">our services</h1>
          <div className="services-wrapper">

            {
              services.map(item=>{
                return  <div className="services-container" key={item.id}>
                {item.icon}
                <h2 className="service-header">
                  {item.title}
                </h2>
                <p className="service-explanation">
                  {item.description}  
                </p>
              </div>
              })
            }

          </div>
        </div>
      </section>
      <Footer/>
    </section>
  );
};

export default Index;
