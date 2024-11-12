// src/app/components/BookSort.js
import React from "react";

const BookSort = ({ sortCriteria, onSortChange }) => {
  return (
    <div className="flex justify-end mt-6">
      <select
        value={sortCriteria}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg shadow-md"
      >
        <option value="publicationDate">Date de publication</option>
        <option value="averageRating">Note moyenne</option>
      </select>
    </div>
  );
};

export default BookSort;
