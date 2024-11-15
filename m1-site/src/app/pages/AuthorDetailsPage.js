import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import ModalCreateBook from "../components/ModalCreateBook";

const AuthorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    publicationDate: new Date().toISOString().split("T")[0],
    price: 0,
    authorId: "",
  });

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  };

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        // Récupération des données de l'auteur et de ses livres
        const authorResponse = await axios.get(`http://127.0.0.1:3001/authors/${id}`);
        const booksResponse = await axios.get(`http://127.0.0.1:3001/books?author_id=${id}`);
        const books = booksResponse.data;

        setAuthor(authorResponse.data);
        setBooks(books);

        // Récupération des avis uniquement pour les livres de cet auteur
        const reviewsResponse = await axios.get("http://127.0.0.1:3001/reviews");
        const authorReviews = reviewsResponse.data.filter((review) =>
          books.some((book) => book.id === review.book.id)
        );
        setReviews(authorReviews);

        // Calcul de la moyenne des avis
        if (authorReviews.length > 0) {
          const totalRatings = authorReviews.reduce((sum, review) => sum + review.stars, 0);
          setAverageRating((totalRatings / authorReviews.length).toFixed(1));
        } else {
          setAverageRating(0);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [id]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Breadcrumb />
      <div className="max-w-4xl mx-auto p-6">
        {author ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <img
                src={author.photoUrl || "https://via.placeholder.com/150"}
                alt={author.name}
                className="w-32 h-32 object-cover rounded-full"
              />
              <div className="ml-6">
                <h1 className="text-3xl font-semibold">{author.name}</h1>
                <p className="text-gray-700">{author.biography || "Aucune biographie disponible."}</p>
                <p className="mt-4 text-xl">
                  <strong>Moyenne des avis :</strong>{" "}
                  {averageRating > 0 ? `${averageRating} / 5` : "Aucun avis"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Auteur non trouvé.</p>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Livres de {author.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.length > 0 ? (
              books
                .filter((book) => book.authorId === author.id) // Filtre pour afficher uniquement les livres de cet auteur
                .map((book) => (
                  <div key={book.id} className="relative bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-blue-500 text-xl font-semibold">
                      <Link to={`/books/${book.id}`}>{book.title}</Link>
                    </h3>
                    <p className="text-gray-600">Description : {book.description || "Pas de description."}</p>
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      ✖
                    </button>
                  </div>
                ))
            ) : (
              <p>Aucun livre trouvé pour cet auteur.</p>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Ajouter un livre
        </button>
        <ModalCreateBook
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          newBook={newBook}
          handleChange={(e) => setNewBook({ ...newBook, [e.target.name]: e.target.value })}
          addBook={async () => {
            try {
              await axios.post("http://127.0.0.1:3001/books", { ...newBook, authorId: id });
              setBooks((prev) => [...prev, { ...newBook, id: Date.now(), authorId: id }]);
              setIsModalOpen(false);
            } catch (error) {
              console.error("Erreur lors de l'ajout du livre :", error);
            }
          }}
        />

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailsPage;
  