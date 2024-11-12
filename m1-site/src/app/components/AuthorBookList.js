// src/app/components/AuthorBookList.js
import React from "react";
// Supprime l'import de Link si tu ne l'utilises pas
// import { Link } from "react-router-dom";

const AuthorBookList = ({ books }) => {
  return (
    <div>
      <h2>Liste des livres</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorBookList;
