import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import ModalCreateBook from "../components/ModalCreateBook";

const AuthorDetailsPage = () => {
  const { id } = useParams(); // ID de l'auteur récupéré depuis l'URL
  const navigate = useNavigate();

  // États principaux
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAuthor, setUpdatedAuthor] = useState({
    name: "",
    photoUrl: "",
    biography: "",
  });

  // États pour le formulaire et la modale du nouveau livre
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    publicationDate: new Date().toISOString().split("T")[0],
    price: 0,
    authorId: "",
  });

  // Chargement des détails de l'auteur et de ses livres
  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const authorResponse = await axios.get(`http://127.0.0.1:3001/authors/${id}`);
        const booksResponse = await axios.get(`http://127.0.0.1:3001/books?author_id=${id}`);

        setAuthor(authorResponse.data);
        setUpdatedAuthor(authorResponse.data);
        setBooks(booksResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [id]);

  // Gérer les changements pour les informations de l'auteur
  const handleAuthorChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAuthor((prev) => ({ ...prev, [name]: value }));
  };

  // Sauvegarde des modifications de l'auteur
  const handleAuthorSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:3001/authors/${id}`, updatedAuthor);
      setAuthor(updatedAuthor);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'auteur :", error);
    }
  };

  // Suppression de l'auteur
  const handleDeleteAuthor = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cet auteur ?")) {
      try {
        await axios.delete(`http://127.0.0.1:3001/authors/${id}`);
        alert("Auteur supprimé avec succès.");
        navigate("/authors");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'auteur :", error);
      }
    }
  };

  // Gérer les changements pour le nouveau livre
  const handleNewBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  // Ajouter un nouveau livre
  const addBook = async () => {
    try {
      await axios.post("http://127.0.0.1:3001/books", { ...newBook, authorId: id });
      setBooks((prev) => [...prev, { ...newBook, authorId: id }]);
      setNewBook({
        title: "",
        publicationDate: new Date().toISOString().split("T")[0],
        price: 0,
        authorId: id,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
    }
  };

  // Rendu principal
  if (loading) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Breadcrumb />
      <div className="max-w-4xl mx-auto p-6">
        {/* Détails de l'auteur */}
        {author ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {!isEditing ? (
              <div className="flex items-center">
                <img
                  src={author.photoUrl || "https://via.placeholder.com/150"}
                  alt={author.name}
                  className="w-32 h-32 object-cover rounded-full"
                />
                <div className="ml-6">
                  <h1 className="text-3xl font-semibold">{author.name}</h1>
                  <p className="text-gray-700">{author.biography || "Aucune biographie disponible."}</p>
                  <div className="mt-4 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => setIsEditing(true)}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={handleDeleteAuthor}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAuthorSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={updatedAuthor.name}
                    onChange={handleAuthorChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Photo (URL)</label>
                  <input
                    type="text"
                    name="photoUrl"
                    value={updatedAuthor.photoUrl}
                    onChange={handleAuthorChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Biographie</label>
                  <textarea
                    name="biography"
                    value={updatedAuthor.biography}
                    onChange={handleAuthorChange}
                    className="w-full px-3 py-2 border rounded"
                  ></textarea>
                </div>
                <div className="space-x-2">
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <p>Auteur non trouvé.</p>
        )}

        {/* Liste des livres de l'auteur */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Livres de {author.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.length > 0 ? (
              books
                .filter((book) => book.authorId === author.id)
                .map((book) => (
                  <div key={book.id} className="bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-blue-500 text-xl font-semibold"><Link to={`/books/${book.id}`}>{book.title}</Link></h3>
                    <p className="text-gray-600">Description : {book.description || "Pas de description."}</p>
                  </div>
                ))
            ) : (
              <p>Aucun livre trouvé pour cet auteur.</p>
            )}
          </div>
        </div>

        {/* Modale pour ajouter un livre */}
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
          handleChange={handleNewBookChange}
          addBook={addBook}
        />

        {/* Bouton de retour */}
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
