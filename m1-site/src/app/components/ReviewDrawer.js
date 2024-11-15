// src/app/components/ReviewDrawer.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalAddReview from "./ModalAddReview";

// Fonction pour générer les étoiles
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
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

const ReviewDrawer = ({ open, onClose, reviews, averageRating, reviewCounts, onAddReview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la modale d'ajout d'avis

  const totalReviews = reviews.length;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} items-center justify-center bg-gray-600 bg-opacity-75`}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6 max-h-full overflow-y-auto">
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          aria-label="Fermer"
        >
          &times;
        </button>

        {/* Bouton Ajouter un avis */}
        <div className="flex justify-start mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ajouter un avis
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center">Avis des utilisateurs</h2>

        {totalReviews === 0 ? (
          <p className="text-center text-gray-500 mt-4">Ce livre ne possède pas d'avis.</p>
        ) : (
          <>
            {/* Affichage de la note moyenne avec des étoiles */}
            <div className="text-center mb-4">
              <div className="flex justify-center items-center mb-2">
                <span className="text-2xl font-semibold text-orange-500 mr-2">{averageRating} sur 5</span>
                <StarRating rating={averageRating} />
              </div>
              <p className="text-gray-500">{totalReviews} évaluations globales</p>
            </div>

            {/* Affichage des pourcentages par étoiles */}
            <div className="space-y-2 mb-6">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center">
                  <div className="w-24 flex items-center justify-start">
                    <StarRating rating={star} />
                  </div>
                  <div className="flex-1 h-4 bg-gray-200 rounded mx-3 relative overflow-hidden">
                    <div
                      className="h-4 bg-orange-500 rounded absolute top-0 left-0"
                      style={{
                        width: `${((reviewCounts[star] / totalReviews) * 100).toFixed(1)}%`,
                      }}
                    />
                  </div>
                  <span className="w-12 text-gray-700 text-right">
                    {((reviewCounts[star] / totalReviews) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Affichage des avis individuels */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center mb-2">
                    <StarRating rating={review.stars} />
                    <span className="ml-2 text-gray-500">{review.stars} sur 5</span>
                  </div>
                  <p className="text-gray-700">{review.comment || "Pas de commentaire."}</p>
                  <p className="text-sm text-gray-400">
                    Posté le {new Date(review.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modale pour ajouter un avis */}
        <ModalAddReview
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(newReview) => {
            onAddReview(newReview); // Appelle la fonction qui enregistre dans l'API
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

ReviewDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  averageRating: PropTypes.number.isRequired,
  reviewCounts: PropTypes.object.isRequired,
  onAddReview: PropTypes.func.isRequired,
};

export default ReviewDrawer;
