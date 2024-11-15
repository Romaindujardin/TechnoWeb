import React from "react";
import { Link } from "react-router-dom";

// Composant pour afficher les étoiles
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating || 0); // 0 si aucune note
  const hasHalfStar = rating - filledStars >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill={index < filledStars ? "#f59e0b" : "none"}
          viewBox="0 0 24 24"
          stroke={index < filledStars || (index === filledStars && hasHalfStar) ? "#f59e0b" : "#d1d5db"}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
          />
        </svg>
      ))}
    </div>
  );
};

const BookCard = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`}>
      <div className="border p-4 m-2 rounded shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        <h2 className="font-bold text-lg mb-2">{book.title}</h2>
        <p>
          <strong>Auteur :</strong> {book.authorName}
        </p>
        <p>
          <strong>Date de publication :</strong> {book.publicationDate}
        </p>
        <p>
          <strong>Note moyenne :</strong>{" "}
          <div className="flex items-center">
            <StarRating rating={book.averageRating} />
            {book.averageRating ? (
              <span className="ml-2">{book.averageRating.toFixed(1)}</span>
            ) : (
              <span className="ml-2 text-gray-500">N/A</span>
            )}
          </div>
        </p>
      </div>
    </Link>
  );
};

export default BookCard;
