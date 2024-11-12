// src/app/pages/BooksPage.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import BookSort from "../components/BookSort";
import axios from "axios";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    publicationDate: new Date().toISOString().split("T")[0], // Formate ISO 8601
    price: 0, // Doit être un nombre
    authorId: "", // Laissez vide mais vérifiez lors de l’envoi
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("publicationDate");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null); // Pour gérer les erreurs

  // Fonction pour récupérer la liste des livres
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/books");

      // Élimination des doublons dans les livres
      const uniqueBooks = response.data.reduce((acc, current) => {
        const isDuplicate = acc.find((item) => item.id === current.id);
        if (!isDuplicate) acc.push(current);
        return acc;
      }, []);

      setBooks(uniqueBooks);
      setError(null); // Réinitialise l'erreur en cas de succès
    } catch (error) {
      console.error("Erreur lors de la récupération des livres:", error);
      setError("Impossible de récupérer les livres. Veuillez réessayer.");
    }
  };

  const addBook = async () => {
    try {
      const formattedBook = {
        ...newBook,
        price: parseInt(newBook.price, 10), // Convertir en entier
      };

      await axios.post("http://127.0.0.1:3001/books", formattedBook);
      fetchBooks();
      setNewBook({
        title: "",
        publicationDate: new Date().toISOString().split("T")[0],
        price: 0,
        authorId: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout du livre:",
        error.response || error
      );
    }
  };

  // Fonction pour gérer les changements dans le formulaire d'ajout
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Gestion du tri et du filtrage des livres
  const sortedBooks = [...books]
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "publicationDate") {
        return new Date(b.publicationDate) - new Date(a.publicationDate);
      } else if (sortCriteria === "averageRating") {
        return (b.averageRating || 0) - (a.averageRating || 0);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Breadcrumb />

      {/* Titre et bouton d'ajout */}
      <div className="flex justify-between items-center px-4 mt-6">
        <h1 className="text-2xl font-bold text-center w-full">
          Liste des livres
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 shadow"
        >
          + Ajouter un livre
        </button>
      </div>

      {/* Affichage d'une erreur en cas de problème */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Barre de recherche */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Rechercher un livre..."
      />

      {/* Fonction de tri */}
      <BookSort sortCriteria={sortCriteria} onSortChange={setSortCriteria} />

      {/* Liste des livres */}
      <div className="grid grid-cols-5 gap-6 p-4">
        {sortedBooks.length > 0 ? (
          sortedBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p className="col-span-5 text-center text-gray-500">
            Aucun livre trouvé
          </p>
        )}
      </div>

      {/* Modal pour le formulaire d'ajout d'auteur */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">
              Ajouter un nouveau livre
            </h2>
            <input
              type="text"
              name="title" // Correction ici
              placeholder="Titre"
              value={newBook.title}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="date" // Utilisez le type "date" pour obtenir le bon format
              name="publicationDate"
              placeholder="date de publication"
              value={newBook.publicationDate}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />

            <input
              type="number" // Utilisez "number" pour forcer un entier
              name="price"
              placeholder="prix"
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
      )}
    </div>
  );
};

export default BooksPage;
