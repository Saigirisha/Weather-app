import { useState } from "react";
import "./SearchBox.css";

const SearchBox = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") return;
    onSearch(city);
    setCity("");
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="search-input"
      />

      <button onClick={handleSearch} type="button" className="search-btn">
        Search
      </button>
    </div>
  );
};

export default SearchBox;
