// src/components/AuthorCard.js
import React from "react";
import { Link } from "react-router-dom"; // Pour la navigation vers les détails de l'auteur

const AuthorCard = ({ author }) => (
  <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg h-72"> 
    {/* On utilise h-72 pour donner une hauteur constante à la carte */}
    <Link to={`/author/${author.id}`} className="w-full h-full flex flex-col justify-between"> {/* Lien cliquable */}
      <img
        src={author.photo || "auteur.jpg"} // Utiliser une image par défaut si 'author.photo' est vide
        alt={author.name}
        className="w-full h-32 object-cover mb-2 rounded-lg" // Fixer la taille de l'image
      />
      <span className="font-semibold">{author.name}</span>
      <span className="text-sm text-gray-500">{author.bookCount || 0} livre(s)</span>
      <p className="text-xs text-gray-600 mt-1">{author.biography || "Pas de biographie disponible"}</p> {/* Biographie */}
    </Link>
  </div>
);

export default AuthorCard;
