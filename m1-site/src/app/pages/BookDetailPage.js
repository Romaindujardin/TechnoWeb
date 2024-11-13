// src/app/pages/BookDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ModalDeleteBook from "../components/ModalDeleteBook"; // Import de la modal de suppression

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // État pour la modal de suppression

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:3001/books/${id}`);
      alert("Livre supprimé avec succès.");
      navigate("/books"); // Rediriger vers la liste des livres après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  };

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

        {/* Bouton pour supprimer le livre */}
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Supprimer le livre
        </button>
        
        {/* Modal de confirmation de suppression */}
        {isDeleteModalOpen && (
          <ModalDeleteBook
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={() => {
              handleDelete();
              setIsDeleteModalOpen(false);
            }}
          />
        )}

        {/* Bouton de retour */}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default BookDetailPage;
