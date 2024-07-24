import "./footer.css";
import Logo from "../logo/Logo";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import quickLinks from "./quicklinks";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Logo />
      <div className="quickLinks-wrapper footer-item">
        <h1 className="title">quick links</h1>
        <ul className="link-list">
          {quickLinks.map((item) => (
            <li className="link-item" key={item.label}>
              <Link to={item.to} className="item-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="contacts-wrapper footer-item">
        <h1 className="title">contacts</h1>
        <div className="phone contact-item">
          <FaPhoneAlt size={14} />
          <span>+254 712 345 678 </span>
        </div>
        <div className="email contact-item">
          <MdEmail size={14} />
          <span>johndoe@gmail.com</span>
        </div>
        <div className="contact-icons">
          <Link>
            <FaGithub size={22} className="contact-icon" />
          </Link>
          <Link>
            <FaInstagram size={22} className="contact-icon" />
          </Link>
          <Link>
            <FaFacebook size={22} className="contact-icon" />
          </Link>
          <Link>
            <FaSquareXTwitter size={22} className="contact-icon" />
          </Link>
        </div>
      </div>
      <div className="newsletter-container footer-item">
        <h1 className="title">newletter</h1>
        <p>
          Join our newsletter to get updates on new groups and amazing deals{" "}
        </p>
        <div className="NL-Input-wrapper">
          <input
            type="text"
            placeholder="enter email"
            name="email"
            className="newsLetter-input"
          />
          <button className="joinNewsletter-btn">
            <FaArrowRight size={12} className="icon" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
