// src/app/components/ModalAddReview.js
import React, { useState } from "react";
import PropTypes from "prop-types";

const ModalAddReview = ({ isOpen, onClose, onSubmit }) => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (stars < 1 || stars > 5) {
      alert("Veuillez donner une note entre 1 et 5 étoiles.");
      return;
    }
    onSubmit({ stars, comment });
    setStars(0);
    setComment("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Ajouter un avis</h3>
        <label className="block mb-2">
          <span className="text-gray-700">Note (entre 1 et 5 étoiles)</span>
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Commentaire (optionnel)</span>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </label>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
};

ModalAddReview.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalAddReview;
