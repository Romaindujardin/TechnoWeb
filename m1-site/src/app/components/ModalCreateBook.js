// src/app/components/ModalCreateBook.js
import React, { useState } from "react";
import axios from "axios";

const ModalCreateBook = ({ isOpen, onClose, onBookAdded }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    publicationDate: "",
    authorId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const addBook = async () => {
    try {
      await axios.post("http://127.0.0.1:3001/books", newBook);
      onBookAdded(); // Callback pour rafraîchir la liste des livres
      setNewBook({ title: "", publicationDate: "", authorId: "" }); // Réinitialisation du formulaire
      onClose(); // Fermer la modale
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
    }
  };

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
          placeholder="Titre du livre"
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
          type="text"
          name="authorId"
          placeholder="Auteur ID"
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
