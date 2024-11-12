// src/app/pages/BooksPage.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import BookSort from "../components/BookSort";
import ModalCreateBook from "../components/ModalCreateBook";
import axios from "axios";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("publicationDate");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour récupérer la liste des livres
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/books");

      // Élimination des doublons dans les livres
      const uniqueBooks = response.data.reduce((acc, current) => {
        const isDuplicate = acc.find(item => item.id === current.id);
        if (!isDuplicate) acc.push(current);
        return acc;
      }, []);
      
      setBooks(uniqueBooks);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres:", error);
    }
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

  // Fonction de rappel pour actualiser les livres après l'ajout
  const handleBookAdded = () => {
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Breadcrumb />

      {/* Titre et bouton d'ajout */}
      <div className="flex justify-between items-center px-4 mt-6">
        <h1 className="text-2xl font-bold text-center w-full">Liste des livres</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 shadow"
        >
          + Ajouter un livre
        </button>
      </div>

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
          sortedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p className="col-span-5 text-center text-gray-500">Aucun livre trouvé</p>
        )}
      </div>

      {/* Modale pour ajouter un livre */}
      <ModalCreateBook
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookAdded={handleBookAdded} // Callback pour rafraîchir la liste
      />
    </div>
  );
};

export default BooksPage;
