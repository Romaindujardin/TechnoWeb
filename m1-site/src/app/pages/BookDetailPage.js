// src/app/pages/BookDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ModalDeleteBook from "../components/ModalDeleteBook";
import ReviewDrawer from "../components/ReviewDrawer";

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCounts, setReviewCounts] = useState({});
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fonction pour calculer la moyenne et le décompte des avis
  const calculateReviewStats = (filteredReviews) => {
    const totalReviews = filteredReviews.length;
    const starsSum = filteredReviews.reduce((sum, review) => sum + review.stars, 0);
    setAverageRating(totalReviews > 0 ? (starsSum / totalReviews).toFixed(1) : 0);

    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    filteredReviews.forEach((review) => {
      counts[review.stars] += 1;
    });
    setReviewCounts(counts);
  };

  // Fonction pour récupérer les détails du livre et les avis associés
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/books/${id}`);
        setBook(response.data);

        const reviewsResponse = await axios.get(`http://127.0.0.1:3001/reviews`);
        const filteredReviews = reviewsResponse.data.filter((review) => review.book.id === parseInt(id));
        setReviews(filteredReviews);
        calculateReviewStats(filteredReviews);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du livre :", error);
        setError("Impossible de charger les détails du livre. Veuillez réessayer.");
      }
    };

    fetchBookDetails();
  }, [id]);

  // Fonction pour supprimer le livre
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:3001/books/${id}`);
      alert("Livre supprimé avec succès.");
      navigate("/books");
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  };

  // Fonction pour ajouter un avis
  const handleAddReview = async (newReview) => {
    try {
      const response = await axios.post("http://127.0.0.1:3001/reviews", {
        ...newReview,
        bookId: book.id, // Associer l'avis au livre actuel
      });
  
      // Mettre à jour la liste des avis après l'ajout
      setReviews((prevReviews) => [...prevReviews, response.data]);
  
      // Recalculer la moyenne et les pourcentages
      const updatedReviews = [...reviews, response.data];
      const totalReviews = updatedReviews.length;
      const starsSum = updatedReviews.reduce((sum, review) => sum + review.stars, 0);
      setAverageRating((starsSum / totalReviews).toFixed(1));
  
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      updatedReviews.forEach((review) => {
        counts[review.stars] += 1;
      });
      setReviewCounts(counts);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis :", error);
      alert("Impossible d'ajouter l'avis. Veuillez réessayer.");
    }
  };
  
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!book) return <p className="text-center">Chargement...</p>;

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

        {/* Bouton pour ouvrir le Drawer des avis */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Voir les avis
        </button>

        {/* Drawer pour afficher les avis */}
        <ReviewDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          reviews={reviews}
          averageRating={averageRating}
          reviewCounts={reviewCounts}
          onAddReview={handleAddReview} // Passer la fonction d'ajout ici
        />

        {/* Bouton pour supprimer le livre */}
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Supprimer le livre
        </button>

        {isDeleteModalOpen && (
          <ModalDeleteBook
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={() => {
              handleDelete();
              setIsDeleteModalOpen(false);
            }}
          />
        )}

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
