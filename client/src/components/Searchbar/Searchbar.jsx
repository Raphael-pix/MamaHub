/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import './Searchbar.css'


const Searchbar = ({query,onSearch}) => {
  
  return (
    <div>
      <div className="search-options-container">
        <div className="search-container">
          <FaSearch size={14} className="icons search" />
          <input
            type="text"
            name="search"
            placeholder="search"
            className="search-input"
            value={query}
            onChange={onSearch}
          />
        </div>
        <div className="search-results"></div>
      </div>
    </div>
  );
};

export default Searchbar;
