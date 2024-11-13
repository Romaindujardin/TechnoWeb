// src/app/pages/BookDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BookDetailPage = () => {
  const { id } = useParams(); // Récupère l'ID du livre depuis l'URL
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du livre :", error);
        setError("Impossible de charger les détails du livre. Veuillez réessayer.");
      }
    };

    fetchBookDetails();
  }, [id]);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!book) return <p className="text-center">Chargement...</p>;

  // Extraire l'année de la date de publication
  const publicationYear = new Date(book.publicationDate).getFullYear();

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">{book.title}</h1>
        <p className="text-gray-600 mb-2">
          <strong>Prix :</strong> {book.price} €
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Année de publication :</strong> {publicationYear}
        </p>
        
        {/* Lien vers la page de l'auteur */}
        <p className="text-gray-600 mb-2">
          <strong>Auteur :</strong>{" "}
          {book.author ? (
            <Link to={`/author/${book.author.id}`} className="text-blue-500 hover:underline">
              {book.author.name}
            </Link>
          ) : (
            "Non spécifié"
          )}
        </p>

        <button
          onClick={() => window.history.back()}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default BookDetailPage;
