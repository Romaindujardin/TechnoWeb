import React from "react";
import { Link } from "react-router-dom";

const AuthorCard = ({ author, books = [] }) => {
  // Filtrer les livres pour obtenir ceux de l'auteur
  const bookCount = (books || []).filter(book => Number(book.authorId) === Number(author.id)).length;
  const bookLabel = bookCount === 1 ? "livre" : "livres";

  // Débogage des données
  console.log("Author:", author);
  console.log("Books:", books);
  console.log("Books for author:", books.filter(book => Number(book.authorId) === Number(author.id)));

  return (
    <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg h-72">
      <Link to={`/author/${author.id}`} className="w-full h-full flex flex-col justify-between">
        <img
          src={author.photo || "auteur.jpg"}
          alt={author.name}
          className="w-full h-32 object-cover mb-2 rounded-lg"
        />
        <span className="font-semibold">{author.name}</span>
        <span className="text-sm text-gray-500">{bookCount} {bookLabel}</span>
        <p className="text-xs text-gray-600 mt-1">{author.biography || "Pas de biographie disponible"}</p>
      </Link>
    </div>
  );
};

export default AuthorCard;
