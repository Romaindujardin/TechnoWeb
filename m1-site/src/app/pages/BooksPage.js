import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import BookSort from "../components/BookSort";
import ModalCreateBook from "../components/ModalCreateBook";
import axios from "axios";

// Page pour afficher la liste des livres
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

  // Fonction pour récupérer les livres avec la note moyenne
  const fetchBooks = async () => {
    try {
      const booksResponse = await axios.get("http://127.0.0.1:3001/books");
      const authorsResponse = await axios.get("http://127.0.0.1:3001/authors");
      const reviewsResponse = await axios.get("http://127.0.0.1:3001/reviews");

      const booksWithRatings = booksResponse.data.map((book) => {
        const bookReviews = reviewsResponse.data.filter(
          (review) => review.book.id === book.id
        );
        const averageRating =
          bookReviews.reduce((sum, review) => sum + review.stars, 0) /
          bookReviews.length || 0;

        const author = authorsResponse.data.find((a) => a.id === book.authorId);

        return {
          ...book,
          authorName: author ? author.name : "Auteur inconnu",
          averageRating: parseFloat(averageRating.toFixed(1)),
        };
      });

      setBooks(booksWithRatings);
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
      setError("Impossible de récupérer les livres. Veuillez réessayer.");
    }
  };

  // Récupérer les livres au chargement de la page
  useEffect(() => {
    fetchBooks();
  }, []);


  // Fonction pour ajouter un livre
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
      console.error("Erreur lors de l'ajout du livre :", error.response || error);
    }
  };


  // Fonction pour mettre à jour les valeurs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  // Filtrer et trier les livres
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
        <h1 className="text-2xl font-bold text-center w-full">Bibliothèque</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 shadow"
        >
          + Ajouter un livre
        </button>
      </div>

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
