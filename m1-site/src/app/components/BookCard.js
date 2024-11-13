// src/app/components/BookCard.js
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`}>
      <div className="border p-4 m-2 rounded shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        <h2 className="font-bold text-lg mb-2">{book.title}</h2>
        <p>Date de publication : {book.publicationDate}</p>
        <p>Auteur ID : {book.authorId}</p>
        <p>Note moyenne : {book.averageRating || "N/A"}</p>
      </div>
    </Link>
  );
};

export default BookCard;
