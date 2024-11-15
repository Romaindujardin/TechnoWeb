import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import ModalCreateBook from "../components/ModalCreateBook";

const AuthorDetailsPage = () => {
  const { id } = useParams(); // Récupère l'ID de l'auteur à partir de l'URL
  const navigate = useNavigate(); // Utilisé pour la navigation dans l'application

  const [author, setAuthor] = useState(null); // État pour stocker les détails de l'auteur
  const [books, setBooks] = useState([]); // État pour stocker la liste des livres de l'auteur
  const [, setReviews] = useState([]); // État pour stocker les avis (non utilisé dans le rendu final)
  const [averageRating, setAverageRating] = useState(0); // État pour stocker la moyenne des avis
  const [loading, setLoading] = useState(true); // État pour gérer le chargement des données
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture et la fermeture du modal pour ajouter un livre
  const [newBook, setNewBook] = useState({
    title: "",
    publicationDate: new Date().toISOString().split("T")[0], // Date actuelle par défaut
    price: 0,
    authorId: "",
  }); // État pour gérer les informations du livre à ajouter

  // Fonction pour supprimer un livre
  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/books/${bookId}`); // Appel à l'API pour supprimer le livre
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId)); // Mise à jour de la liste des livres après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error); // Gestion des erreurs
    }
  };

  // useEffect pour récupérer les détails de l'auteur, ses livres et les avis
  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        // Récupération des données de l'auteur et de ses livres
        const authorResponse = await axios.get(`http://127.0.0.1:3001/authors/${id}`);
        const booksResponse = await axios.get(`http://127.0.0.1:3001/books?author_id=${id}`);
        const books = booksResponse.data;

        setAuthor(authorResponse.data); // Stocke les détails de l'auteur
        setBooks(books); // Stocke les livres de l'auteur

        // Récupération des avis uniquement pour les livres de cet auteur
        const reviewsResponse = await axios.get("http://127.0.0.1:3001/reviews");
        const authorReviews = reviewsResponse.data.filter((review) =>
          books.some((book) => book.id === review.book.id)
        );
        setReviews(authorReviews); // Stocke les avis de l'auteur (même si non utilisé dans l'UI)

        // Calcul de la moyenne des avis
        if (authorReviews.length > 0) {
          const totalRatings = authorReviews.reduce((sum, review) => sum + review.stars, 0);
          setAverageRating((totalRatings / authorReviews.length).toFixed(1)); // Calcule la moyenne des étoiles
        } else {
          setAverageRating(0); // Aucun avis, la moyenne est 0
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error); // Gestion des erreurs
      } finally {
        setLoading(false); // Met à jour l'état de chargement lorsque les données sont récupérées
      }
    };

    fetchAuthorDetails();
  }, [id]); // L'effet est déclenché lorsque l'ID de l'auteur change (dans l'URL)

  if (loading) return <div>Chargement...</div>; // Affiche un message de chargement pendant que les données sont récupérées

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* Composant Navbar pour l'en-tête */}
      <Breadcrumb /> {/* Composant Breadcrumb pour la navigation */}
      <div className="max-w-4xl mx-auto p-6">
        {author ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <img
                src={author.photoUrl || "https://via.placeholder.com/150"} // Affiche l'image de l'auteur ou une image par défaut
                alt={author.name}
                className="w-32 h-32 object-cover rounded-full"
              />
              <div className="ml-6">
                <h1 className="text-3xl font-semibold">{author.name}</h1> {/* Affiche le nom de l'auteur */}
                <p className="text-gray-700">{author.biography || "Aucune biographie disponible."}</p> {/* Affiche la biographie de l'auteur */}
                <p className="mt-4 text-xl">
                  <strong>Moyenne des avis :</strong>{" "}
                  {averageRating > 0 ? `${averageRating} / 5` : "Aucun avis"} {/* Affiche la moyenne des avis */}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Auteur non trouvé.</p> // Affiche un message si l'auteur n'est pas trouvé
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Livres de {author.name}</h2> {/* Affiche le titre des livres */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.length > 0 ? (
              books
                .filter((book) => book.authorId === author.id) // Filtre les livres pour n'afficher que ceux de l'auteur
                .map((book) => (
                  <div key={book.id} className="relative bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-blue-500 text-xl font-semibold">
                      <Link to={`/books/${book.id}`}>{book.title}</Link> {/* Lien vers la page du livre */}
                    </h3>
                    <p className="text-gray-600">Description : {book.description || "Pas de description."}</p> {/* Affiche la description du livre */}
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                      onClick={() => handleDeleteBook(book.id)} // Supprimer le livre
                    >
                      ✖
                    </button>
                  </div>
                ))
            ) : (
              <p>Aucun livre trouvé pour cet auteur.</p> // Affiche un message si aucun livre n'est trouvé
            )}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)} // Ouvre le modal pour ajouter un livre
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Ajouter un livre
        </button>
        <ModalCreateBook
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Ferme le modal
          newBook={newBook} // Passe les données du nouveau livre au modal
          handleChange={(e) => setNewBook({ ...newBook, [e.target.name]: e.target.value })} // Met à jour les informations du livre
          addBook={async () => {
            try {
              await axios.post("http://127.0.0.1:3001/books", { ...newBook, authorId: id }); // Envoie les informations du nouveau livre à l'API
              setBooks((prev) => [...prev, { ...newBook, id: Date.now(), authorId: id }]); // Ajoute le nouveau livre à la liste des livres
              setIsModalOpen(false); // Ferme le modal
            } catch (error) {
              console.error("Erreur lors de l'ajout du livre :", error); // Gestion des erreurs
            }
          }}
        />

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(-1)} // Retour à la page précédente
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
