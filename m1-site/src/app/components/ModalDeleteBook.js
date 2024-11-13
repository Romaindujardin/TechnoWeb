// src/app/components/ModalDeleteBook.js
import React from "react";

const ModalDeleteBook = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Confirmer la suppression</h3>
        <p>Êtes-vous sûr de vouloir supprimer ce livre ? Cette action est irréversible.</p>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded"
            onClick={onCancel}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteBook;
