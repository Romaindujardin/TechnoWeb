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
  const [newBook, setNewBook] = useState({
    title: "",
    publicationDate: new Date().toISOString().split("T")[0],
    price: 0,
    authorId: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("publicationDate");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour récupérer la liste des livres
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/books");
      const uniqueBooks = response.data.reduce((acc, current) => {
        const isDuplicate = acc.find((item) => item.id === current.id);
        if (!isDuplicate) acc.push(current);
        return acc;
      }, []);
      setBooks(uniqueBooks);
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres:", error);
      setError("Impossible de récupérer les livres. Veuillez réessayer.");
    }
  };

  // Fonction pour ajouter un nouveau livre
  const addBook = async () => {
    try {
      const formattedBook = {
        ...newBook,
        price: parseInt(newBook.price, 10),
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
      console.error("Erreur lors de l'ajout du livre:", error.response || error);
    }
  };

  // Gestion des changements dans le formulaire d'ajout
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
        <h1 className="text-2xl font-bold text-center w-full">Liste des livres</h1>
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
          <p className="col-span-5 text-center text-gray-500">Aucun livre trouvé</p>
        )}
      </div>

      {/* Modale pour ajouter un livre */}
      <ModalCreateBook
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newBook={newBook}
        handleChange={handleChange}
        addBook={addBook}
      />
    </div>
  );
};

export default BooksPage;
