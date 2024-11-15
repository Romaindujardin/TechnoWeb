// src/app/components/SearchBar.js
import React from "react";

// Composant pour la barre de recherche
const SearchBar = ({ searchQuery, onSearchChange, placeholder = "Rechercher..." }) => {
  return (
    <div className="flex justify-center mt-6 px-4">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded-lg shadow-md"
      />
    </div>
  );
};

export default SearchBar;
