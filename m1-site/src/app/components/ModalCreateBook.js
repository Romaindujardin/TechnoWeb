// src/app/components/ModalCreateBook.js
import React from "react";

const ModalCreateBook = ({ isOpen, onClose, newBook, handleChange, addBook }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Ajouter un nouveau livre</h2>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={newBook.title}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="publicationDate"
          placeholder="Date de publication"
          value={newBook.publicationDate}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={newBook.price}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="authorId"
          placeholder="ID de l'auteur"
          value={newBook.authorId}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          onClick={addBook}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default ModalCreateBook;
