import React from "react";
// import { FiSearch } from "react-icons/fi"; // Using React Icons for a search icon

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4">

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="w-full px-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800"
      />
    </div>
  );
};

export default SearchBar;
