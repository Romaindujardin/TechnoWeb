// src/app/components/ReviewDrawer.js
import React from "react";
import PropTypes from "prop-types";

// Fonction pour générer les étoiles
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating); // Nombre d'étoiles pleines
  const hasHalfStar = rating - filledStars >= 0.5; // Demi-étoile si nécessaire

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

const ReviewDrawer = ({ open, onClose, reviews, averageRating, reviewCounts }) => {
  const totalReviews = reviews.length;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} items-center justify-center bg-gray-600 bg-opacity-75`}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          aria-label="Fermer"
        >
          &times;
        </button>
        
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
                  {/* Conteneur des étoiles */}
                  <div className="w-24 flex items-center justify-start">
                    <StarRating rating={star} />
                  </div>
                  {/* Barre de pourcentage */}
                  <div className="flex-1 h-4 bg-gray-200 rounded mx-3 relative overflow-hidden">
                    <div
                      className="h-4 bg-orange-500 rounded absolute top-0 left-0"
                      style={{
                        width: `${((reviewCounts[star] / totalReviews) * 100).toFixed(1)}%`,
                      }}
                    />
                  </div>
                  {/* Texte du pourcentage */}
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
                  {/* Affichage des étoiles pour chaque avis */}
                  <div className="flex items-center mb-2">
                    <StarRating rating={review.stars} />
                    <span className="ml-2 text-gray-500">{review.stars} sur 5</span>
                  </div>
                  {/* Affichage du commentaire ou d'un message alternatif */}
                  <p className="text-gray-700">
                    {review.comment ? review.comment : "Pas de commentaire."}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
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
};

export default ReviewDrawer;
